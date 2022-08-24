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

const guessesQty = 5;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);


  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);


  const pickWordAndPickCategory = useCallback(() => {

    // Category
    const categories = Object.keys(words) // Todas as categorias do arquivo data.js
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // Número aleatório do index do array de categorias

    // Word
    const word = words[category][Math.floor(Math.random() * words[category].length)] // Sorteio do index da palavra, referente a categoria sorteada acima

    return { category, word };
  }, [words]);

  // Starts the secret word game
  const startGame = useCallback(() => {    
    // Clear all letters
    clearLetterStates();
    // pick word and pick category
    const { word, category } = pickWordAndPickCategory(); 


    // Create array of letters
    let wordLetters = word.split("");
    
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);


  }, [pickWordAndPickCategory]);

  // process the letter input
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // Check if letter has already been utilized

    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)) 
    {
      return;
    }

    // Push guessed letter or remove a guess
    
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };

  function clearLetterStates() {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // check if guesses ended
  useEffect(() => {
    if(guesses <= 0){
      setGameStage(stages[2].name);
      clearLetterStates();
    }

  }, [guesses]);

  // check win condition
  useEffect(() => {
    
    const uniqueLetters = [...new Set(letters)];

    // win condition
    if(guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame();
    }


  }, [guessedLetters, letters, startGame]);



  // restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  }


  return (
    <div className="App">
      { gameStage === "start" && <StartScreen startGame={startGame}  />}
      { gameStage === "game" && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      { gameStage === "end" && <GameOver retry={retry} score={score} />}
      
    </div>
  );
}

export default App;
