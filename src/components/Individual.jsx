import React, { useState, useEffect } from 'react';
import '../Individual.css';

const Individual = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Retrieve documents from the simulated blockchain
    const blockchain = JSON.parse(localStorage.getItem('blockchain') || '[]');
    setDocuments(blockchain);
  }, []);

  return (
    <div>
      <h1>Individual Portal</h1>
      <h2>Your Documents:</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
          <span className="doc-info">
            {doc.type} - ID: {doc.id} - Issued on: {new Date(doc.issueDate).toLocaleDateString()}
          </span>
          <button onClick={() => alert(`Document content: ${doc.content}`)}>View</button>
        </li>        
        ))}
      </ul>

      <div className="back-to-home">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  );
};

export default Individual;