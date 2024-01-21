import React, { useState } from "react";

import "../styles/chatbotStyles.css";

export default function BotMessage({ message, onOptionSelected }) {
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    if (!message) {
        return null;
    }

  return (
    <div className="message-container">
            {message.type === 'question' ? (
                <div>
                    <div className="bot-message">{message.question}</div>
                    <div className="bot-options">
                        {message.reponseText && message.reponseText.map((option, index) => {
                            const onClickHandler = () => {
                                setIsAnswered(true);
                                setSelectedOptionIndex(index);
                                onOptionSelected(option, index, message.id);
                            };

                            const backgroundColor = isAnswered
                                ? (index === selectedOptionIndex ? "black" : "darkgreen")
                                : "#45a049";

                            return (
                                <button 
                                    key={index} 
                                    onClick={onClickHandler} 
                                    disabled={isAnswered}
                                    style={{backgroundColor}}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="bot-message">{message.question}</div>
            )}
        </div>
  );
}
