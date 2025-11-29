import React from "react";

function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div className={`chat-message-row ${isUser ? "user" : "assistant"}`}>
      <div className="chat-bubble-wrapper">
        <div className="chat-bubble-wrapper-inner">
          {!isUser && (
            <div className="chat-meta">
              <span className="badge-small">AI</span>
            </div>
          )}
          {isUser && (
            <div className="chat-meta">
              <span className="badge-small">You</span>
            </div>
          )}

          <div
            className={`chat-bubble ${
              isUser ? "user-bubble" : "assistant-bubble"
            }`}
          >
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
