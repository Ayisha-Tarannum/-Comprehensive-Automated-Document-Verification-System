import React, { useState } from 'react';
import '../VerifyingAuthority.css';

const VerifyingAuthority = () => {
  const [documentId, setDocumentId] = useState('');
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;

      const blockchain = JSON.parse(localStorage.getItem('blockchain') || '[]');
      const storedDocument = blockchain.find((doc) => doc.id === documentId);

      if (storedDocument && storedDocument.content === content) {
        setVerificationResult(
          `✅ Document verified successfully.\nType: ${storedDocument.type}, Issued on: ${new Date(
            storedDocument.issueDate
          ).toLocaleDateString()}`
        );
      } else {
        setVerificationResult(
          '❌ Verification failed. The document does not match our records or the ID is incorrect.'
        );
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="verify-container">
      <h1 className="verify-title">Verifying Authority Portal</h1>
      <form className="verify-form" onSubmit={handleVerify}>
        <div className="form-group">
        <label htmlFor="documentId">Document ID:</label>
        <input
          type="text"
          id="documentId"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          required
        />
    </div>
    <div className="form-group">
        <label htmlFor="file">Upload Document for Verification:</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0] || null)}
          required
        />
    </div>

        <button className="verify-button" type="submit">Verify Document</button>
      </form>

      {verificationResult && (
        <div className="verify-result">
          <h2>Verification Result:</h2>
          <p>{verificationResult}</p>
        </div>
      )}

      <a className="verify-back" href="/">← Back to Home</a>
    </div>
  );
};

export default VerifyingAuthority;
