import React from 'react';
import './app.scss';
import WordsList from './components/wordsList/WordsList';

function App() {
  const arr = ['friend', 'neighbour', 'surname', 'address', 'married']
  return (
    <div className="App">
      <WordsList words={arr} />
    </div>
  );
}

export default App;
