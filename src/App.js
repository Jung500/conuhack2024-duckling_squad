import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [estVisible, setEstVisible] = useState(true);

  const cacherBouton = () => {
    setEstVisible(false);
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
        </body>
      </div>
    </div>
  );
}

export default App;