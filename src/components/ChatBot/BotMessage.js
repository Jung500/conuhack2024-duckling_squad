import React, { useState, useEffect } from "react";

export default function BotMessage({ message, onOptionSelected }) {

    if (!message) {
        // Render nothing or a placeholder if message is null
        return null;
    }

  return (
    <div className="message-container">
      {message.type === 'question' ? (
        <div>
          <div className="bot-message">{message.text}</div>
          <div className="bot-options">
            {message.options.map((option, index) => (
              <button key={index} onClick={() => onOptionSelected(option)}>{option}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bot-message">{message.text}</div>
      )}
    </div>
  );
}
