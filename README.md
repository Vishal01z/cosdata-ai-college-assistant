🌟 AI College Assistant – RAG + Cosdata Hybrid Search + Local AI Model
Final Hackathon-Ready Edition | Cosdata Hackathon 2025 Submission
<p align="center"> <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/schools.svg" width="120"/> </p> <p align="center"> <img src="https://img.shields.io/badge/AI%20Native%20Project-RAG%20%2B%20Cosdata-brightgreen?style=for-the-badge"> <img src="https://img.shields.io/badge/FastAPI-Backend-blue?style=for-the-badge"> <img src="https://img.shields.io/badge/React%20%2B%20Vite-Frontend-ff69b4?style=for-the-badge"> <img src="https://img.shields.io/badge/FLAN--T5-Local%20AI-orange?style=for-the-badge"> <img src="https://img.shields.io/badge/Cosdata%20OSS-Vector%20Search-purple?style=for-the-badge"> </p>
🏆 Cosdata Hackathon Goal Alignment – Why This Project is Strong

This project checks every requirement of Cosdata Hackathon 2025:

✔ AI-native application
✔ Cosdata OSS vector search
✔ Dense embedding indexing
✔ RAG-based answering
✔ Hybrid system (RAG + Local model)
✔ Real-world education use case
✔ Clean UI + working demo
✔ Full documentation + final submission ready

This is a complete, production-style project, not a prototype.

🚀 About the Project

AI College Assistant helps students learn faster by allowing them to:

Upload class notes (PDF)

Ask any question from syllabus topics

Get clean, simple, bullet-point answers

Powered by a Hybrid AI Engine → RAG + Local AI model

Uses Cosdata OSS for semantic search

Works offline using FLAN-T5 local model

Beautiful frontend with chat interface

A perfect student learning companion.

🎨 Brand Banner
<p align="center"> <img src="https://dummyimage.com/900x220/000/fff&text=AI+College+Assistant+%7C+RAG+%2B+Cosdata+%2B+FLAN-T5" /> </p>
✨ Highlight Features (Final Edition)
🔍 1. Hybrid RAG Engine

Retrieves relevant content from uploaded PDFs

Uses Cosdata OSS for vector search

Automatically falls back to FLAN-T5 when notes don’t contain answer

Always responds in clean bullet points

📄 2. Smart PDF Processing

Extracts text

Splits into semantic chunks

Embeds using SentenceTransformer

Stores vectors in Cosdata

🤖 3. Local Offline AI (FLAN-T5)

No API cost.
No internet required.
Fast and simple explanations.

💬 4. Chat UI

Simple + smooth

Typing animation

Chat history

Clear chat button

Looks like a real AI assistant

💻 5. Modern Tech Stack

Frontend: React + Vite

Backend: FastAPI

AI Models: FLAN-T5, SentenceTransformer

Vector Search: Cosdata OSS

PDF Engine: PyMuPDF

📸 Screenshots (Auto Placeholder)
📍 Home Screen
<p align="center"> <img src="https://dummyimage.com/900x500/222/fff&text=Homepage" /> </p>
📍 Upload Notes
<p align="center"> <img src="https://dummyimage.com/900x500/444/fff&text=PDF+Uploader" /> </p>
📍 AI Chat Responses
<p align="center"> <img src="https://dummyimage.com/900x500/555/fff&text=Chat+Interface+%5C+AI+Response" /> </p>
🧠 Architecture Diagram (Final Version)
                    ┌───────────────────────────┐
                    │         FRONTEND           │
                    │   React + Vite + Axios     │
                    └───────────────┬───────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │          BACKEND           │
                    │        FastAPI API         │
                    │  - PDF Extract             │
                    │  - RAG Pipeline            │
                    │  - AI Fallback (T5)        │
                    └───────────────┬───────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │        COSDATA OSS         │
                    │ Vector DB for embeddings   │
                    │ HNSW dense vector search   │
                    └───────────────────────────┘

🧩 RAG Pipeline (Final Version)
User Query
      ↓
Retrieve relevant note chunks from Cosdata
      ↓
If match found → Clean bullet answer (RAG Mode)
      ↓
Else → FLAN-T5 generates explanation (AI Mode)
      ↓
Frontend displays final answer in chat

🗂 Folder Structure (Final)
ai-college-assistant/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── rag_pipeline.py
│   │   ├── utils/
│   │   │   ├── pdf_utils.py
│   │   │   └── embeddings.py
│   │   ├── config.py
│   ├── venv/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│
└── README.md

▶️ How to Run the Project (Final Instructions)
🚀 Backend (FastAPI)
cd backend
./venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload


Runs at:
http://127.0.0.1:8000

🌐 Frontend (React + Vite)
cd frontend
npm install
npm run dev


Runs at:
http://localhost:5173

🎥 Demo Flow (For Hackathon Presentation)

Upload any textbook/college PDF

Ask:

Explain OOP
What is inheritance?
Generate 5 MCQs from Unit 1


System checks your PDF → finds relevant chunks

Gives clean bullet-point answer

If nothing found → FLAN-T5 generates explanation

Fast, simple, and real-world useful.

🎯 Why This Project Stands Out

✔ Solves real student problem
✔ Fully AI-native (Cosdata + LLM)
✔ Works offline
✔ Clean UI
✔ Strong architecture
✔ Detailed README
✔ Hackathon-ready demo

This looks like a production-grade product, not just a hackathon demo.

🏷 GitHub Tags (Add These)
rag
cosdata
vector-search
semantic-search
flan-t5
fastapi
react
vite
education
ai-assistant
hackathon2025
student-app

👨‍💻 Developer

Vishal Suryavanshi
AI Developer | Software Engineer

⭐ Support the Project

If you like this project, consider starring the repo.
It helps visibility in judging.
