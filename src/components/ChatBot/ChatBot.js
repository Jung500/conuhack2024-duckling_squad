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
    // Add more questions as needed
  ];

  useEffect(() => {
    async function loadWelcomeMessage() {
      const welcomeMessage = await API.GetChatbotResponse("Question 1");
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

  useEffect(() => {
    // Only proceed if there are more questions to ask
    if (currentQuestionIndex < questions.length) {
      const nextQuestion = questions[currentQuestionIndex];
      const questionMessage = {
        text: nextQuestion.text,
        options: nextQuestion.options,
        type: 'question'
      };
  
      const botMessage = (
        <BotMessage
          key={messages.length}
          message={questionMessage}
          onOptionSelected={handleOptionSelected}
        />
      );
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }
  }, [currentQuestionIndex]);

  const handleOptionSelected = option => {
    // Send the user's choice
    send(option, true);
  };

  const send = async (text, isOption = false) => {
    // Add the user's message
    const userMessage = <UserMessage key={messages.length + 1} text={text} />;
    setMessages(prevMessages => [...prevMessages, userMessage]);
  
    // Check if the message is a user's choice and proceed to the next question
    if (isOption && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentIndex => currentIndex + 1);
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
