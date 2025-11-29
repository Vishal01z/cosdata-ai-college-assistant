import React, { useState } from "react";
import { askQuestion } from "../services/api";
import ChatMessage from "./ChatMessage";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m your AI College Assistant. Upload your notes on the left, then ask anything about your syllabus or topics here.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState(""); // typing effect
  const [isTyping, setIsTyping] = useState(false);

  // -----------------------------------------------------
  // TYPING ANIMATION
  // -----------------------------------------------------
  const typeWriterEffect = (fullText) => {
    let i = 0;
    const speed = 18; // typing-speed

    setDisplayedText("");
    setIsTyping(true);

    function type() {
      if (i < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
        setTimeout(type, speed);
      } else {
        // push final AI message into chat history
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fullText },
        ]);
        setIsTyping(false);
      }
    }

    type();
  };

  // -----------------------------------------------------
  // SEND QUESTION TO BACKEND
  // -----------------------------------------------------
  const sendQuestion = async () => {
    if (!question.trim()) return;

    // user message
    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await askQuestion(question);
      const answerText =
        res.answer ||
        "I could not generate an answer right now. Please try again.";

      typeWriterEffect(answerText); // <<--- TYPING ANIMATION HERE
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error contacting AI backend. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  // Enter key shortcut
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. You can continue asking questions about your uploaded notes.",
      },
    ]);
    setDisplayedText("");
  };

  return (
    <div className="chat-container">
      <div className="info-row">
        <div>
          <div className="panel-title">Ask Your AI Assistant</div>
          <div className="info-label">
            Ask questions about topics, units, definitions, or exam prep.
          </div>
        </div>
        <div className="info-pill">RAG mode active</div>
      </div>

      <div className="chat-history panel">
        {/* Render previous messages */}
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} role={msg.role} content={msg.content} />
        ))}

        {/* Typing animation bubble */}
        {isTyping && (
          <ChatMessage role="assistant" content={displayedText + "▌"} />
        )}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          className="chat-input"
          placeholder="e.g. Explain OOP in simple words, or generate 5 MCQs from Unit 1..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button className="button-primary" onClick={sendQuestion} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <button className="button-secondary" onClick={clearChat}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default Chat;
