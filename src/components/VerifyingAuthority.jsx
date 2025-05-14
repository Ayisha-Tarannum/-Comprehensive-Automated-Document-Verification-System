import React, { useState } from 'react';
import '../VerifyingAuthority.css';

const VerifyingAuthority = () => {
  const [documentId, setDocumentId] = useState('');
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!file || !documentId) {
      alert("Please enter Document ID and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentId', documentId);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/verify', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setVerificationResult(data.message);
    } catch (error) {
      setVerificationResult('❌ Error during verification: ' + error.message);
    } finally {
      setLoading(false);
    }
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
            accept=".pdf,.docx,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0] || null)}
            required
          />
        </div>
        <button className="verify-button" type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Document"}
        </button>
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
