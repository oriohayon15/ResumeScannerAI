from flask import Blueprint, request, jsonify
from ml.pdf_parser import extract_text_from_pdf

match_blueprint = Blueprint('match', __name__)

@match_blueprint.route("/extract", methods=["POST"])
def extract_text():
    if "resume" not in request.files:
        return jsonify({"error: No Resume File Uploaded"}), 400
    
    resume_pdf = request.files["resume"]
    text = extract_text_from_pdf(resume_pdf)
    return jsonify({"text": text})