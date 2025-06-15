
_________________________________________
                                      
| Automated Document Verification System |                                   
-----------------------------------------

A secure, OCR-powered, web-based platform that allows authorized **Issuing Authorities** to generate official documents, and **Verifying Authorities** to verify them based on their content. This system simulates document integrity validation using **blockchain-like** storage (via `localStorage`) and ensures only registered authorities can access the respective portals.



✨ **Features**

- 🔐 Role-based login for Issuers and Verifiers
- 📤 Upload support for PDFs, DOCX, JPEG, PNG, etc.
- 🔍 OCR (Optical Character Recognition) for content extraction
- ✅ Verifies documents based on actual file content, not just metadata
- 📁 Blockchain-style document storage using `localStorage`
- 👥 Issuing authority can view documents they issued
- 🧾 Individuals can view only the documents verified by them
- 📝 Verifiers can register and login


⚙️ **Technologies Used**

🧠 Frontend:
- React.js (with Hooks and React Router)
- Vite (build tool)
- CSS3 for styling
- `localStorage` for blockchain simulation

🛠 Backend:
- Flask (Python)
- Flask-CORS
- Tesseract OCR (for text extraction)
- Poppler-utils (for PDF handling)
- Universal OCR function (supporting PDFs, DOCX, images)


**Installation**

1. Clone the repository:

   git clone https://github.com/Ayisha-Tarannum/-Comprehensive-Automated-Document-Verification-System.git

   cd Automated-Document-Verification


2. Install dependencies:

   npm install


3. Backend (flask)

   cd backend 
   
   python app.py 


3. Start the servers:

   cd frontend

   npm run dev


4. Open the app at http://localhost.
   

**Additional System Dependencies**:

These must be installed on your system manually (not via pip):

**Tesseract OCR**

Windows: Download from https://github.com/tesseract-ocr/tesseract

**Poppler-utils (for PDF to image conversion)**

Windows: https://blog.alivate.com.au/poppler-windows/

🧪 **Usage Flow**

**Login/Register:**

Issuers can only log in or register.

Verifiers can register and then log in.

**Issuing Authority:**

Upload a document.

OCR extracts content.

The document is added to the blockchain (in localStorage).

**Verifying Authority:**

Upload the document.

The system checks if its content matches any stored record.

If verified, it's marked as verified by the current verifier.

**Individual View:**

A verifier can view all the documents they have verified via the Individual section.

**Issued Documents View:**

Issuers can see all documents they have issued.

