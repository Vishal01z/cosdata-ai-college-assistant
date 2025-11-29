import React, { useState } from "react";
import UploadBox from "../components/UploadBox";
import Chat from "../components/Chat";

function Home() {
  const [, setFullDocText] = useState("");

  const handleTextExtracted = (text) => {
    setFullDocText(text);
    // Future: send text to backend to index in Cosdata, etc.
  };

  return (
    <main className="page-container">
      <section className="left-panel panel">
        <UploadBox onTextExtracted={handleTextExtracted} />
      </section>

      <section className="right-panel">
        <Chat />
      </section>
    </main>
  );
}

export default Home;
