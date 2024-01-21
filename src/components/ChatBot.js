import React, { useState, useEffect } from "react";
import { Constants } from "../Constants";

import BotMessage from "./BotMessage";
import BotMessageEnd from "./BotMessageEnd";
import UserMessage from "./UserMessage";
import Messages from "./Messages";
import Input from "./Input";
import Header from "./Header";

import "../styles/chatbotStyles.css";

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userResponses, setUserResponses] = useState([]);

    useEffect(() => {
        if (currentQuestionIndex === 7) {
            async function loadLastMessage() {
                const welcomeMessage = {
                    id: 8,
                    question: " *NOTE : Manque de temps/Not enough time -Devs\nTo get your anwser enter your mastercard",
                    reponseText: [],
                    reponseValue: [],
                    type: 'question'
                };
    
                const botMessage = (
                    <BotMessageEnd
                        key="0"
                        message={welcomeMessage}
                    />
                );
                setMessages(prevMessages => [...prevMessages, botMessage]);

            }
            loadLastMessage();
        }
    }, [currentQuestionIndex]);

    // const questions = [
    //     { id: 'Autre1', question: 'Est vous un nouveau entrepreneur?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    //     { id: 'Autre2', question: 'Avez vous fait un business case?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    //     { id: 'Autre3', question: 'Avec vous un business plan?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    //     { id: 'Autre4', question: 'Avez vous fait une analyse sur le retour d investissement?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    //     { id: 'Autre5', question: 'Avez vous fait un business case?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    //     { id: 'Autre6', question: 'Avec vous un business plan?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    //     { id: 'Autre7', question: 'Avez vous fait une analyse sur le retour d investissement?', reponseText: ["non", "oui"], reponseValue: [0, 1] },
    // ];
    const questions = Constants.ALL_QUESTION;

    useEffect(() => {
        async function loadWelcomeMessage() {
            const welcomeMessage = {
                id: 0,
                question: "Bienvenue au service d'assistance pour entreprises en difficulté. Ce formulaire interactif a été conçu pour évaluer votre situation spécifique à travers une série de questions ciblées. À l'issue de ce questionnaire, nous analyserons vos réponses afin de vous fournir des recommandations sur mesure, adaptées à vos besoins et à ceux de votre entreprise. Veuillez cliquer sur « Démarrer » pour commencer cette expérience personnalisée.",
                reponseText: ['Démarrer'],
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

        if (option === 'Démarrer') {

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
                key={`bot_${new Date().getTime()}`}
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
                key={`bot_${new Date().getTime()}`}
                message={{ ...question, type: 'question' }}
                onOptionSelected={handleOptionSelected}
            />
        );
        setMessages(prevMessages => [...prevMessages, botMessage]);
    };


    const send = async (text, isOption = false, optionIndex = null) => {
        // Add the user's message
        const userMessage = <UserMessage key={`user_${new Date().getTime()}`} text={text} />;
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
