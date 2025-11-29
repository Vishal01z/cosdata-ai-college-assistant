from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.utils.pdf_utils import extract_text_from_pdf
from app.rag_pipeline import index_text, hybrid_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"message": "Backend running successfully!"}

@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file)
    index_text(text)
    return {"message": "PDF uploaded & indexed with Cosdata successfully."}

@app.post("/ask")
async def ask_question(query: str):
    answer = hybrid_answer(query)
    return {"answer": answer}
