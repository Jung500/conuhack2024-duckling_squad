import { React, useState } from 'react';

import './App.css';

import QuestionAnswerComponent from './components/QuestionAnswerComponent';

function App() {
  const [estVisible, setEstVisible] = useState(true);

  const cacherBouton = () => {
    setEstVisible(false);
  };

  const question = "Quelle est votre couleur préférée ?";
  const answers = [
    { id: 1, name: 'Rouge' },
    { id: 2, name: 'Bleu' },
    { id: 3, name: 'Vert' },
    { id: 4, name: 'Jaune' },
    { id: 5, name: 'Brun' },
    { id: 6, name: 'Mauve' },
  ];

  const [person, setPerson] = useState({
    name: null,
  });

  const handleAnswerChange = (selectedOption) => {
    setPerson({
      ...person,
      name: selectedOption.name,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ConuHack</h1>
      </header>

      <div className="Main">
        <body className="Main-body">
          <p className="description" style={{ marginBottom: '150px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          
          {estVisible && (
            <button onClick={cacherBouton} className="grand-bouton">
              Commencer
            </button>
          )}
          {/*<QuestionAnswerComponent 
            question={question}
            answers={answers}
            person={person}
            onAnswerChange={handleAnswerChange}
          />*/}
        </body>
      </div>
    </div>
  );
}

export default App;