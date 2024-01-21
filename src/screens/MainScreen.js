import { React, useState } from 'react';

import QuestionViewComponent from '../components/QuestionViewComponent';
import UserAnswerViewComponent from '../components/UserAnswerViewComponent';

function MainScreen(props) {

    const [buttonIsVisible, setButtonIsVisible] = useState(true);
    const [startQuestions, setStartQuestions] = useState(false);

    {/* QUESTION & ANSWERS DATA*/}
    const question = "Quelle est votre couleur préférée ?";
    const answers = [
        { id: 1, name: 'Rouge' },
        { id: 2, name: 'Bleu' },
        { id: 3, name: 'Vert' },
        { id: 4, name: 'Jaune' },
        { id: 5, name: 'Brun' },
        { id: 6, name: 'Mauve' },
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
        setPerson({
        ...person,
        name: selectedOption.name,
        });
    };

    return (
        <div>
            <header className="App-header">
                <h1>ConuHack</h1>
            </header>

            <div className="Main">

                {/* START - MAIN SCREEN */}
                <body className="Main-body">
                <p className="description" style={{ marginBottom: '150px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                
                {buttonIsVisible && (
                    <button onClick={cacherBouton} className="grand-bouton">
                    Commencer
                    </button>
                )}
                {/* END - MAIN SCREEN */}
                
                
                {/* START - Print Question And Answer */}
                <div className="QuestionAnswerContainer">
                {startQuestions && <QuestionViewComponent
                    question={question}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                />}
                {person.name && <UserAnswerViewComponent answer={person.name} />}
                </div>
                {/* END - Print Question And Answer */}

                </body>
            </div>
        </div>
    );
}

export default MainScreen;