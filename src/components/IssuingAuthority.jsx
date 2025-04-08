import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../IssuingAuthority.css';

const IssuingAuthority = () => {
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const documentId = Math.random().toString(36).substr(2, 9);
      const document = {
        id: documentId,
        type: documentType,
        content: content,
        issueDate: new Date().toISOString()
      };

      const blockchain = JSON.parse(localStorage.getItem('blockchain') || '[]');
      blockchain.push(document);
      localStorage.setItem('blockchain', JSON.stringify(blockchain));

      alert(`Document stored with ID: ${documentId}`);
      setDocumentType('');
      setFile(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="issuing-container">
      <h1 className="page-title">Issuing Authority Portal</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="documentType">Document Type:</label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          >
            <option value="">Select a document type</option>
            <option value="birthCertificate">Birth Certificate</option>
            <option value="academicTranscript">Academic Transcript</option>
            <option value="experienceCertificate">Experience Certificate</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload Document:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0] || null)}
            required
          />
        </div>

        <button type="submit">Generate and Store Document</button>
      </form>

      {/* Back to Home at bottom */}
      <Link to="/" className="back-home">
        ← Back to Home
      </Link>
    </div>
  );
};

export default IssuingAuthority;
