import requests
from transformers import T5Tokenizer, T5ForConditionalGeneration
from app.utils.embeddings import get_embedding
from app.config import COSDATA_URL, INDEX_NAME


###############################################
# 1. LOAD FLAN-T5 (BEST FREE CLEAN MODEL)
###############################################
tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base").to("cpu")


###############################################
# 2. CLEAN MODEL OUTPUT (REMOVE JUNK)
###############################################
def clean_ai_output(raw: str):
    raw = raw.replace("\n", " ").strip().lower()

    bad_words = [
        "explain", "answer", "bullet points", "question",
        "repeat", "instruction", "in simple terms",
        "in very simple", "here is", ":", "-"
    ]

    for b in bad_words:
        raw = raw.replace(b, "")

    # Split into sentences
    parts = [p.strip().capitalize() for p in raw.split(".") if p.strip()]

    bullets = []
    for p in parts:
        if len(bullets) >= 4:
            break
        if len(p) > 2:
            bullets.append(f"- {p}.")

    if not bullets:
        return "- Sorry, I couldn't generate an answer."

    return "\n".join(bullets)


###############################################
# 3. TEXT CHUNKING (PDF → Chunks)
###############################################
def chunk_text(text: str):
    chunks = text.split(". ")
    cleaned = []

    for c in chunks:
        c = c.strip().replace("\n", " ")
        if len(c) > 30:
            cleaned.append(c)

    return cleaned


###############################################
# 4. INDEX TEXT INTO COSDATA
###############################################
def index_text(text: str):
    chunks = chunk_text(text)

    for i, chunk in enumerate(chunks):
        vector = get_embedding(chunk)

        doc = {
            "namespace": INDEX_NAME,
            "id": f"doc_{i}",
            "vector": vector,
            "metadata": {"text": chunk}
        }

        try:
            requests.post(
                f"{COSDATA_URL}/api/v1/vectors/upsert",
                json={"vectors": [doc]},
                timeout=2
            )
        except:
            print("Cosdata server not reachable.")


###############################################
# 5. RAG RETRIEVAL (Search from notes)
###############################################
def rag_retrieve(query: str):
    query_emb = get_embedding(query)

    payload = {
        "namespace": INDEX_NAME,
        "vector": query_emb,
        "topK": 3
    }

    try:
        res = requests.post(
            f"{COSDATA_URL}/api/v1/vectors/query",
            json=payload,
            timeout=3
        )
        data = res.json()
        matches = data.get("matches", [])
    except:
        return []

    retrieved = []
    for m in matches:
        retrieved.append(m["metadata"]["text"])

    return retrieved


###############################################
# 6. GENERATE CLEAN ANSWER USING FLAN-T5
###############################################
def flan_answer(prompt: str):
    inputs = tokenizer(prompt, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_new_tokens=120,
        temperature=0.3,
        top_p=0.9,
        no_repeat_ngram_size=3,
        repetition_penalty=2.0
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)


###############################################
# 7. HYBRID ANSWER (RAG + FLAN Fallback)
###############################################
def hybrid_answer(query: str):
    # 1) Try to answer from uploaded notes
    retrieved = rag_retrieve(query)

    if retrieved:
        bullets = [f"- {c}" for c in retrieved]
        return "Here is the answer based on your uploaded notes:\n\n" + "\n".join(bullets)

    # 2) AI answer using FLAN-T5 (clean)
    prompt = (
        "Explain in VERY simple bullet points (max 4). "
        "Do NOT repeat the question. "
        "Do NOT repeat instructions. "
        f"Answer this: {query}"
    )

    try:
        ai_raw = flan_answer(prompt)
        return clean_ai_output(ai_raw)
    except:
        return "- Sorry, I could not generate an answer right now. Please try again."
