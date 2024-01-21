import React, { useState, useEffect } from "react";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";

import API from "./ChatBotAPI";

import "./styles.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      text: "What's your favorite color?",
      options: ['Red', 'Blue', 'Green'],
    },
    {
      text: "What's your favorite animal?",
      options: ['Dog', 'Cat', 'Bird'],
    },
    {
        text: "What's your favorite month?",
        options: ['Jan', 'Feb', 'mar'],
      },
    // Add more questions as needed
  ];

  useEffect(() => {
    async function loadWelcomeMessage() {
      const welcomeMessage = {
        text: "Welcome to the chatbot! Click 'Start' to begin.",
        options: ['Start'],
        type: 'question'
      };
  
      setMessages([
        <BotMessage
          key="0"
          message={welcomeMessage}
          onOptionSelected={handleOptionSelected}
        />
      ]);
    }
    loadWelcomeMessage();
  }, []);

  const handleOptionSelected = (option, index) => {
    if (option === 'Start') {
      // Load the first question when 'Start' is selected
      const firstQuestion = questions[currentQuestionIndex];
      const botMessage = (
        <BotMessage
          key="1"
          message={{ ...firstQuestion, type: 'question' }}
          onOptionSelected={handleOptionSelected}
        />
      );
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } else {
      // Handle other options as before
      send(option, true, index);
    }
  };

  const send = async (text, isOption = false, optionIndex = null) => {
    let displayText = text;
    if (isOption && optionIndex !== null) {
        // If it's an option, append the index to the display text
        //displayText = `${text} (option ${optionIndex + 1})`;
    }
    
    // Add the user's message
    const userMessage = <UserMessage key={messages.length + 1} text={displayText} />;
    setMessages(prevMessages => [...prevMessages, userMessage]);
  
    if (isOption) {
      // Increment currentQuestionIndex to load the next question
      setCurrentQuestionIndex(currentIndex => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
          const nextQuestion = questions[nextIndex];
          const botMessage = (
            <BotMessage
              key={messages.length + 2}
              message={{ ...nextQuestion, type: 'question' }}
              onOptionSelected={handleOptionSelected}
            />
          );
          setMessages(prevMessages => [...prevMessages, botMessage]);
        }
        return nextIndex;
      });
    } else {
      // Handle regular text message (e.g., initial greeting or non-option responses)
      const botResponse = await API.GetChatbotResponse(text);
      if (botResponse) {
        const botMessage = (
          <BotMessage
            key={messages.length + 2}
            message={botResponse}
            onOptionSelected={handleOptionSelected}
          />
        );
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    }
  };

  return (
    <div className="chatbot">
      <Messages messages={messages} />
      <Input onSend={send} />
    </div>
  );
}

export default Chatbot;
