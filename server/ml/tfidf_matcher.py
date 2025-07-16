from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_job_keywords(job_application, top_n=20):
    vectorizer = TfidfVectorizer(stop_words="english")
    X = vectorizer.fit_transform([job_application])
    scores = X.toarray()[0]
    words = vectorizer.get_feature_names_out()

    keywords_scores = list(zip(words, scores))
    sorted_keywords = sorted(keywords_scores, key=lambda x: x[1], reverse=True)
    return [word for word, _ in sorted_keywords[:top_n]]

def keyword_match_score(resume, job_keywords):
    resume_words = set(resume.split())
    matched_keywords = [kw for kw in job_keywords if kw in resume_words]
    if not job_keywords:
        return 0.0, []
    score = (len(matched_keywords) / len(job_keywords)) * 100
    return round(score, 2), matched_keywords

def semantic_match_score(resume_text, job_text):
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    job_embedding = model.encode(job_text, convert_to_tensor=True)
    score = util.pytorch_cos_sim(resume_embedding, job_embedding).item()
    return round(score * 100, 2)

def inflate_score(score):
    if score < 30:
        return min(score * 2.2, 70)  # Give a big boost, but cap at 70
    elif score < 60:
        return min(score * 1.6, 85)  # Moderate boost
    elif score < 80:
        return min(score * 1.15, 95)  # Small boost
    else:
        return min(score, 100)       # Cap at 100, no boost

def final_match_score(resume, job_application):
    job_keywords = extract_job_keywords(job_application)
    keyword_score, matched_keywords = keyword_match_score(resume, job_keywords)
    semantic_score = semantic_match_score(resume, job_application)

    combined_score = round((0.9 * semantic_score + 0.1 * keyword_score), 2)

    inflated_score = inflate_score(combined_score)

    return {
        "Match Score": inflated_score
    }



