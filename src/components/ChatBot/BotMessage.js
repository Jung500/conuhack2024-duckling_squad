import React, { useState, useEffect } from "react";

export default function BotMessage({ message, onOptionSelected }) {

    if (!message) {
        return null;
    }

  return (
    <div className="message-container">
      {message.type === 'question' ? (
        <div>
          <div className="bot-message">{message.question}</div>
          <div className="bot-options">
            {message.reponseText && message.reponseText.map((option, index) => (
              <button key={index} onClick={() => onOptionSelected(option, index, message.id)}>{option}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bot-message">{message.question}</div>
      )}
    </div>
  );
}
