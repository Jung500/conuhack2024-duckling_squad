import { React, useState, useEffect } from 'react';

import QuestionViewComponent from '../components/QuestionViewComponent';
import UserAnswerViewComponent from '../components/UserAnswerViewComponent';

import Chatbot from '../components/ChatBot/ChatBot';

function MainScreen(props) {

    const [buttonIsVisible, setButtonIsVisible] = useState(true);
    const [startQuestions, setStartQuestions] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    {/* QUESTION & ANSWERS DATA*/}
    const questionsData = [
        {
          question: "Quelle est votre couleur préférée ?",
          answers: [
            { id: 1, name: 'Rouge' },
            { id: 2, name: 'Bleu' },
            { id: 3, name: 'Vert' },
            { id: 4, name: 'Jaune' },
            { id: 5, name: 'Brun' },
            { id: 6, name: 'Mauve' },
            // ... other answers
          ],
        },
        {
            question: "Quelle est la taille de votre compagnie ?",
            answers: [
              { id: 1, name: '0 a 25' },
              { id: 2, name: '25 a 50' },
              { id: 3, name: '50 a 100' },
              { id: 4, name: '100 a 500' },
              { id: 5, name: '500 et +' },
              // ... other answers
            ],
          },
          {
            question: "Quelle est votre couleur préférée ?",
            answers: [
              { id: 1, name: 'Rouge' },
              { id: 2, name: 'Bleu' },
              { id: 3, name: 'Vert' },
              { id: 4, name: 'Jaune' },
              { id: 5, name: 'Brun' },
              { id: 6, name: 'Mauve' },
              // ... other answers
            ],
          },
          {
            question: "Quelle est la taille de votre compagnie ?",
            answers: [
              { id: 1, name: '0 a 25' },
              { id: 2, name: '25 a 50' },
              { id: 3, name: '50 a 100' },
              { id: 4, name: '100 a 500' },
              { id: 5, name: '500 et +' },
              // ... other answers
            ],
          },
        // ... other questions
      ];

    {/* PERSON DATA */}
    const [person, setPerson] = useState({
        name: null,
    });

    const cacherBouton = () => {
        /*setButtonIsVisible(false);*/
        setStartQuestions(true);
    };

    const handleAnswerChange = (selectedOption) => {
        setUserAnswers(prevAnswers => [...prevAnswers, selectedOption.name]);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        /*setPerson({
        ...person,
        name: selectedOption.name,
        });*/
    };

    return (
        <div>
            {/*
            <header className="App-header">
                <h1>ConuHack</h1>
            </header>
            

            <div className="Main">

                <body className="Main-body">
                <p className="description" style={{ marginBottom: '150px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                
                {buttonIsVisible && (
                    <button onClick={cacherBouton} className="grand-bouton">
                    Commencer
                    </button>
                )}
                */}
                

                  <Chatbot />

                
                
                <div className="QuestionAnswerContainer">
                    {startQuestions && currentQuestionIndex < questionsData.length && (
                    <QuestionViewComponent
                        question={questionsData[currentQuestionIndex].question}
                        answers={questionsData[currentQuestionIndex].answers}
                        onAnswerChange={handleAnswerChange}
                    />
                    )}

                    {userAnswers.map((answer, index) => (
                    <UserAnswerViewComponent answer={answer} />
                    ))}
                </div>

                {/*<div className="QuestionAnswerContainer">
                {startQuestions && <QuestionViewComponent
                    question={question}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                />}
                {person.name && <UserAnswerViewComponent answer={person.name} />}
                </div>*/}


                {/*</body>
            </div>*/}
        </div>
    );
}

export default MainScreen;