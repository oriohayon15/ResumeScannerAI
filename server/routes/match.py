from flask import Blueprint, request, jsonify
from ml.pdf_parser import extract_text_from_pdf
from ml.preprocesing import preprocess_text

match_blueprint = Blueprint('match', __name__)

@match_blueprint.route("/extract", methods=["POST"])
def extract_text():
    if "resume" not in request.files:
        return jsonify({"error": "No Resume File Uploaded"}), 400
    
    resume_pdf = request.files["resume"]

    raw_text = extract_text_from_pdf(resume_pdf)

    clean_text = preprocess_text(raw_text)
    
    return jsonify({"text": clean_text})

