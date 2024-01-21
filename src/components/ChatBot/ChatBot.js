import React, { useState, useEffect } from "react";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";
import Header from "./Header";

import API from "./ChatBotAPI";

import "./styles.css";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);

    const questions = [
        {id: 'Autre1', question: 'Est vous un nouveau entrepreneur?', reponseText: [ "non", "oui"], reponseValue: [ 0, 1]},
        {id: 'Autre2', question: 'Avez vous fait un business case?', reponseText: [ "non", "oui"], reponseValue: [ 0, 1]},
        {id: 'Autre3', question: 'Avec vous un business plan?', reponseText: [ "non", "oui"], reponseValue: [ 0, 1]},
        {id: 'Autre4', question: 'Avez vous fait une analyse sur le retour d investissement?', reponseText: [ "non", "oui"], reponseValue: [ 0, 1]},
    ];

    
    useEffect(() => {
        {/*  When userResponses changes, do ...*/}
    }, [userResponses]);

    useEffect(() => {
        async function loadWelcomeMessage() {
            const welcomeMessage = {
                id: 0,
                question: "Welcome to the chatbot! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere ornare sapien, a imperdiet tellus iaculis vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi accumsan, purus non dignissim eleifend, felis sem varius diam, nec imperdiet urna nunc malesuada ligula. Nullam ornare bibendum diam. Click 'Start' to begin.",
                reponseText: ['Start'],
                reponseValue: [0],
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

    const handleOptionSelected = (option, optionIndex, messageId) => {
        if (option === 'Start') {

            loadFirstQuestion();

        } else {

            // Store user response

            const currentQuestion = questions[currentQuestionIndex];
            const response = {
            questionId: messageId,
            optionId: optionIndex,
            option: option,
            reponseValue: currentQuestion.reponseValue[optionIndex]
            };

            setUserResponses(prevResponses => [...prevResponses, response]);

            // Handle other options as before
            send(option, true, optionIndex);

            loadNextQuestion();
        }
    };

    const loadFirstQuestion = () => {
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
    }

    const loadNextQuestion = () => {
        // Increment currentQuestionIndex to load the next question
        setCurrentQuestionIndex(currentIndex => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            sendQuestion(questions[nextIndex]);
        }
        return nextIndex;
        });
    };
  
    const sendQuestion = (question) => {
        const botMessage = (
        <BotMessage
            key={messages.length + 1}
            message={{ ...question, type: 'question' }}
            onOptionSelected={handleOptionSelected}
        />
        );
        setMessages(prevMessages => [...prevMessages, botMessage]);
    };


    const send = async (text, isOption = false, optionIndex = null) => {
        // Add the user's message
        const userMessage = <UserMessage key={messages.length + 1} text={text} />;
        setMessages(prevMessages => [...prevMessages, userMessage]);
    };

    return (
        <div className="chatbot">
            <Header />
            <Messages messages={messages} />
            <Input onSend={send} />
        </div>
    );
}

export default Chatbot;
