# ResumeScannerAI – ML Resume Job Match Analyzer  

**Overview**  
ResumeScannerAI is a full-stack web application that helps job seekers evaluate how well their resumes align with specific job descriptions. Using Natural Language Processing (NLP) techniques like TF-IDF and Sentence-BERT embeddings, the app computes a match score, highlights missing keywords, and provides actionable suggestions to optimize resumes for Applicant Tracking Systems (ATS).  

**Features**  
- Upload resume and job description (PDF/Text input supported)  
- AI-powered resume–job match score (TF-IDF and semantic similarity)  
- Suggested keywords to improve alignment  
- Dynamic frontend built with React and Tailwind CSS  
- Flask backend with integrated ML/NLP pipeline  
- ATS-style feedback disclaimer for clarity  

**Tech Stack**  
- Frontend: React, Tailwind CSS  
- Backend: Flask, Python  
- NLP/ML: scikit-learn (TF-IDF), SentenceTransformers (all-MiniLM-L6-v2)  
- Other: PDF parsing, REST API integration  

---

**Deployment**  
I am planning to deploy this project soon. For now, you can run it locally by following the steps below.  

**Installation & Setup**  

**1. Clone the Repository**
```bash
git clone https://github.com/yourusername/ResumeScannerAI.git
cd ResumeScannerAI

**2. Backend Setup**
cd server
pip install -r requirements.txt
python app.py

**3. Frontend Setup**
cd client
npm install
npm run dev

**4. Open Browser**

---

Developer: Ori Ohayon 
https://www.linkedin.com/in/ori-ohayon/
https://github.com/oriohayon15



