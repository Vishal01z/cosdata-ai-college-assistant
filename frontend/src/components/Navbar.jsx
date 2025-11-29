import React from "react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="nav-logo">AI</div>
        <div>
          <div className="nav-title">AI College Assistant</div>
          <div className="nav-subtitle">
            Cosdata-powered RAG search for your notes
          </div>
        </div>
      </div>
      <div className="nav-tag">Hackathon 2025 • Cosdata OSS</div>
    </header>
  );
}

export default Navbar;
