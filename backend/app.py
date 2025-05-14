# backend/app.py

import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from universal_ocr import extract_text

app = Flask(__name__)
CORS(app)

# Folder to store original OCR text by document ID
STORAGE_DIR = "stored_docs"
os.makedirs(STORAGE_DIR, exist_ok=True)

@app.route('/issue', methods=['POST'])
def issue_document():
    file = request.files['file']
    doc_type = request.form.get('documentType')
    filename = str(uuid.uuid4())[:8] + "_" + file.filename
    filepath = os.path.join("uploads", filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(filepath)

    extracted_text = extract_text(filepath)
    doc_id = str(uuid.uuid4())[:8]

    # Save extracted text
    with open(os.path.join(STORAGE_DIR, f"{doc_id}.txt"), "w", encoding="utf-8") as f:
        f.write(extracted_text)

    return jsonify({
        "documentId": doc_id,
        "extractedText": extracted_text
    })

@app.route('/verify', methods=['POST'])
def verify_document():
    file = request.files['file']
    document_id = request.form.get('documentId')

    filepath = os.path.join("uploads", "verify_" + file.filename)
    file.save(filepath)

    extracted_text = extract_text(filepath)

    try:
        with open(os.path.join(STORAGE_DIR, f"{document_id}.txt"), "r", encoding="utf-8") as f:
            original_text = f.read()
    except FileNotFoundError:
        return jsonify({"message": "❌ Document ID not found in records."})

    if extracted_text.strip() == original_text.strip():
        return jsonify({"message": "✅ Document verified successfully."})
    else:
        return jsonify({"message": "❌ Document tampered. Content mismatch."})

if __name__ == '__main__':
    app.run(debug=True)
