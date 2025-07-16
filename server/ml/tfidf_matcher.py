from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

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

def calculate_similarity(resume, job_application):
    documents = [resume, job_application]

    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity_score = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2]) [0][0]

    return round(similarity_score * 100, 2)

def final_match_score(resume, job_application):
    job_keywords = extract_job_keywords(job_application)
    keyword_score, matched = keyword_match_score(resume, job_keywords)
    cosine_score = calculate_similarity(resume, job_application)

    final_score = round((0.6 * keyword_score + 0.4 * cosine_score), 2)
    return {
        "match_score": final_score,
        "keyword_score": keyword_score,
        "cosine_score": cosine_score,
        "matched_keywords": matched,
        "total_keywords": job_keywords
    }



