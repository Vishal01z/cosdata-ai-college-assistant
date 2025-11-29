📚 AI College Assistant

Smart RAG-powered study companion that transforms your PDF notes into an intelligent Q&A system using Cosdata vector search and FLAN-T5 AI.

Show Image
Show Image
Show Image

🎯 Overview
AI College Assistant helps students master their coursework by instantly answering questions using their own uploaded study materials. Built with cutting-edge RAG (Retrieval-Augmented Generation) technology, it searches through your notes with Cosdata vector database and provides precise, context-aware answers.
No match found? The system seamlessly falls back to FLAN-T5 AI to generate clean, concise explanations in bullet-point format.

✨ Key Features
📄 Smart PDF Processing

Upload syllabi, lecture notes, textbooks, or any study material
Automatic text extraction and intelligent chunking
Multi-document support for comprehensive knowledge bases

🔍 Cosdata-Powered RAG Search

Lightning-fast semantic search through your notes
Retrieves the most relevant information for each query
Context-aware answers using sentence-transformers/all-MiniLM-L6-v2 embeddings
Accurate, personalized responses based on YOUR material

🤖 FLAN-T5 AI Fallback
When no relevant notes are found, intelligent AI generates:

✅ 4 clean, simple bullet points
✅ No repetition or fluff
✅ Beginner-friendly explanations
✅ Structured, scannable format

💬 Interactive Chat Interface

Unlimited questions per session
Clean, modern conversation UI
Message history with timestamps
One-click chat reset functionality

⚡ Production-Ready Backend

FastAPI for blazing-fast performance
Asynchronous request handling
RESTful API design
Easy deployment to Render, Railway, or any cloud platform


🏗️ Tech Stack
Backend
TechnologyPurposeFastAPIHigh-performance async web frameworkTransformersFLAN-T5 model & inferenceSentence TransformersEmbedding generation (all-MiniLM-L6-v2)Cosdata APIVector database for semantic searchPyPDF2PDF text extractionPython 3.10+Core language
Frontend
TechnologyPurposeReact.jsUI framework (Vite build)AxiosHTTP client for API callsCSS ModulesScoped stylingModern ES6+JavaScript features

📁 Project Structure
ai-college-assistant/
│
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app & routes
│   │   ├── rag_pipeline.py      # RAG logic + fallback
│   │   ├── utils/
│   │   │   ├── pdf_utils.py     # PDF extraction
│   │   │   ├── embeddings.py    # Vector embeddings
│   │   │   └── cosdata.py       # Cosdata integration
│   │   └── config.py            # Environment variables
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Example env vars
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   └── Home.jsx         # Main page
    │   ├── components/
    │   │   ├── UploadBox.jsx    # PDF upload UI
    │   │   ├── Chat.jsx         # Chat interface
    │   │   └── Sidebar.jsx      # Navigation (optional)
    │   ├── services/
    │   │   └── api.js           # API service layer
    │   ├── App.jsx              # Root component
    │   └── main.jsx             # Entry point
    ├── package.json
    └── vite.config.js

⚙️ Installation & Setup
Prerequisites

Python 3.10 or higher
Node.js 18+ and npm
Cosdata API credentials (free tier available)

1️⃣ Backend Setup
bash# Clone the repository
git clone https://github.com/yourusername/ai-college-assistant.git
cd ai-college-assistant/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and add your Cosdata API key

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
Backend will be available at http://localhost:8000
2️⃣ Frontend Setup
bash# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Configure API endpoint (if needed)
# Edit src/services/api.js to match your backend URL

# Run development server
npm run dev
Frontend will be available at http://localhost:5173

🔗 API Endpoints
Health Check
httpGET /ping
Response: {"status": "ok", "message": "AI College Assistant is running"}
Upload PDF
httpPOST /upload_pdf
Content-Type: multipart/form-data

file: <pdf_file>
Response: {"message": "PDF uploaded and indexed successfully", "filename": "notes.pdf"}
Ask Question
httpPOST /ask?query=your_question
Response:
json{
  "query": "what is array",
  "answer": "An array is a data structure...",
  "source": "rag",  // or "ai_fallback"
  "confidence": 0.89
}
Clear Index
httpDELETE /clear_index
```
**Response:** `{"message": "Index cleared successfully"}`

---

## 🧠 How RAG Works (Architecture)
```
┌─────────────┐
│  User Query │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Embed Query         │
│ (all-MiniLM-L6-v2)  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Search Cosdata      │
│ Vector Database     │
└──────┬──────────────┘
       │
       ▼
    Found?
    /    \
  Yes     No
   │       │
   ▼       ▼
┌──────┐ ┌────────────┐
│ RAG  │ │ FLAN-T5    │
│Answer│ │ Fallback   │
└──────┘ └────────────┘
Step-by-Step Process

Document Upload

Extract text from PDF using PyPDF2
Split into semantic chunks (sentences/paragraphs)
Generate embeddings for each chunk
Store in Cosdata vector database


Query Processing

Convert user question → embedding vector
Perform semantic similarity search in Cosdata
Retrieve top-k most relevant chunks (k=3)


Answer Generation

If relevant chunks found (RAG mode):

Combine context from retrieved chunks
Present direct answer from your notes


If no relevant chunks (AI fallback):

Use FLAN-T5 to generate explanation
Format as 4 clean bullet points






🎬 Usage Example
1. Upload Your Notes
bashcurl -X POST http://localhost:8000/upload_pdf \
  -F "file=@data_structures_notes.pdf"
2. Ask Questions
bash# Question about uploaded content
curl "http://localhost:8000/ask?query=explain%20binary%20search%20tree"

# Response (RAG mode):
{
  "answer": "A binary search tree is a node-based data structure where each node has at most two children. Left child < parent, right child > parent. Allows O(log n) search time.",
  "source": "rag",
  "confidence": 0.92
}

# Question not in notes
curl "http://localhost:8000/ask?query=what%20is%20quantum%20computing"

# Response (AI fallback):
{
  "answer": "• Uses quantum mechanics principles for computation\n• Leverages superposition and entanglement\n• Can solve certain problems exponentially faster\n• Still in early development stage",
  "source": "ai_fallback"
}

🚀 Deployment
Backend (Render/Railway)
render.yaml:
yamlservices:
  - type: web
    name: ai-college-assistant
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: COSDATA_API_KEY
        sync: false
Frontend (Netlify/Vercel)
netlify.toml:
toml[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

🔮 Roadmap & Future Enhancements

 Multi-document merging - Combine multiple PDFs into one knowledge base
 Smart summarization - Generate chapter summaries automatically
 MCQ generation - Create practice questions from notes
 Voice input - Ask questions using speech-to-text
 Flashcard mode - Spaced repetition learning
 Export chat history - Save Q&A sessions as markdown
 Collaborative study - Share knowledge bases with classmates
 Mobile app - iOS/Android native apps


🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request


📄 License
This project is licensed under the MIT License - see LICENSE file for details.

🙏 Acknowledgments

Cosdata for vector database technology
Hugging Face for transformer models
FastAPI for excellent framework
All contributors and testers


📧 Contact & Support

Issues: GitHub Issues
Discussions: GitHub Discussions
Email: your.email@example.com


<div align="center">
Made with ❤️ for students worldwide
⭐ Star this repo if it helped you ace your exams!
</div>