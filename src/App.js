
// CSS
import './App.css';

// React
import { useCallback, useEffect, useState} from "react";

// data
import {wordsList} from "./data/words";

// Components
import StartScreen  from "./components/StartScreen";
import GameOver from './components/GameOver';
import Game from './components/Game';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);



  const pickWordAndPickCategory = () => {

    // Category
    const categories = Object.keys(words) // Todas as categorias do arquivo data.js
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // Número aleatório do index do array de categorias

    // Word
    const word = words[category][Math.floor(Math.random() * words[category].length)] // Sorteio do index da palavra, referente a categoria sorteada acima

    return { category, word };
  }

  // Starts the secret word game
  const startGame = () => {
    setGameStage(stages[1].name);
    
    // pick word and pick category
    const { word, category } = pickWordAndPickCategory(); 


    // Create array of letters
    let wordLetters = word.split("");
    
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    
    console.log(wordLetters);
    console.log(category, word);


    setPickedWord(pickedWord);
    setPickedCategory(pickedCategory);
    setLetters(letters);

  };

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);

  }

  // restarts the game
  const retry = () => {
    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame={startGame}  />}
      { gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      { gameStage === "end" && <GameOver retry={retry} />}
      
    </div>
  );
}

export default App;
