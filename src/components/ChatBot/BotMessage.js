import React, { useState, useEffect } from "react";

export default function BotMessage({ message, onOptionSelected }) {

    if (!message) {
        return null;
    }

  return (
    <div className="message-container">
      {message.type === 'question' ? (
        <div>
          <div className="bot-message">{message.text}</div>
          <div className="bot-options">
            {message.options.map((option, index) => (
              <button key={index} onClick={() => onOptionSelected(option, index)}>{option}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bot-message">{message.text}</div>
      )}
    </div>
  );
}