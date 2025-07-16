from flask import Blueprint, request, jsonify
from ml.pdf_parser import extract_text_from_pdf
from ml.preprocesing import preprocess_text
from ml.tfidf_matcher import calculate_similarity, final_match_score, keyword_match_score, extract_job_keywords

match_blueprint = Blueprint('match', __name__)

@match_blueprint.route("/extract", methods=["POST"])
def extract_text():
    if "resume" not in request.files:
        return jsonify({"error": "No Resume File Uploaded"}), 400
    
    resume_pdf = request.files["resume"]
    job_description = request.form.get("job")

    if not job_description:
        return jsonify({"error": "No Job Application Uploaded"}), 400

    resume_raw_text = extract_text_from_pdf(resume_pdf)
    resume_clean_text = preprocess_text(resume_raw_text)

    job_clean_text = preprocess_text(job_description)

    match_score = final_match_score(resume_clean_text, job_clean_text)
    
    return jsonify({"Your Match Score: ": f"{match_score}/100"})

