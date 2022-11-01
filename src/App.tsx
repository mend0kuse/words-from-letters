import React from 'react';
import './app.scss';
import WordByLetters from './components/wordByLetters/WordByLetters';

function App() {
  return (
    <div className="App">
      <WordByLetters word='car' />
    </div>
  );
}

export default App;
