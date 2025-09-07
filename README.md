**ResumeScannerAI – ML Resume Job Match Analyzer**
---
Overview

ResumeScannerAI is a full-stack web application that helps job seekers evaluate how well their resumes align with specific job descriptions. Using Natural Language Processing (NLP) techniques like TF-IDF and Sentence-BERT embeddings, the app computes a match score, highlights missing keywords, and provides actionable suggestions to optimize resumes for Applicant Tracking Systems (ATS).
---
Features
---
Upload resume and job description (PDF/Text input supported)

AI-powered resume–job match score (TF-IDF and semantic similarity)

Suggested keywords to improve alignment

Dynamic frontend built with React and Tailwind CSS

Flask backend with integrated ML/NLP pipeline

ATS-style feedback disclaimer for clarity
---
Tech Stack

Frontend: React, Tailwind CSS
Backend: Flask, Python
NLP/ML: scikit-learn (TF-IDF), SentenceTransformers (all-MiniLM-L6-v2)
Other: PDF parsing, REST API integration
