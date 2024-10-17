import React, { useState } from 'react';

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
      
      // Retrieve the blockchain from localStorage
      const blockchain = JSON.parse(localStorage.getItem('blockchain') || '[]');
      
      // Find the document with the given ID
      const storedDocument = blockchain.find((doc) => doc.id === documentId);

      if (storedDocument && storedDocument.content === content) {
        setVerificationResult(`Document verified successfully. Type: ${storedDocument.type}, Issued on: ${new Date(storedDocument.issueDate).toLocaleDateString()}`);
      } else {
        setVerificationResult('Verification failed. The document does not match our records or the ID is incorrect.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Verifying Authority Portal</h1>
      <form onSubmit={handleVerify}>
        <div>
          <label htmlFor="documentId">Document ID:</label>
          <input
            type="text"
            id="documentId"
            value={documentId}
            onChange={(e) => setDocumentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="file">Upload Document for Verification:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0] || null)}
            required
          />
        </div>
        <button type="submit">Verify Document</button>
      </form>
      {verificationResult && (
        <div>
          <h2>Verification Result:</h2>
          <p>{verificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyingAuthority;