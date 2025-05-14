import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../IssuingAuthority.css';

const IssuingAuthority = () => {
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !documentType) {
      alert("Please select a document type and file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/issue', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const document = {
        id: data.documentId,
        type: documentType,
        content: data.extractedText,
        issueDate: new Date().toISOString()
      };

      const blockchain = JSON.parse(localStorage.getItem('blockchain') || '[]');
      blockchain.push(document);
      localStorage.setItem('blockchain', JSON.stringify(blockchain));

      alert(`✅ Document issued successfully with ID: ${data.documentId}`);
      setDocumentType('');
      setFile(null);
    } catch (error) {
      alert(`❌ Error issuing document: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            accept=".pdf,.docx,.jpg,.jpeg,.png"
            onChange={(e) => setFile(e.target.files[0] || null)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate and Store Document'}
        </button>
      </form>

      <Link to="/" className="back-home">← Back to Home</Link>
    </div>
  );
};

export default IssuingAuthority;
