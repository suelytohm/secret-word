import "./Game.css"
import { useState, useRef } from "react";
const Game = ({
  verifyLetter, 
  pickedWord, 
  pickedCategory, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses,
  score
}) => {

  const [letter, setLetter] = useState("");
  const letterImputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    verifyLetter(letter);
    setLetter("");

    letterImputRef.current.focus();

  }

  return (
      <div className="game">
          <p className="points">
            <span>Pontuação: {score}</span>
          </p>
          <h2>Adivinhe a palavra:</h2>
          <h3 className="tip">
            Dica da palavra: <span>{pickedCategory}</span>
          </h3>
          <p>Você ainda tem {guesses} tentativas</p>

          <div className="wordContainer">

            {letters.map((letter, i) => 
              guessedLetters.includes(letter) ? (
              <span key={i} className="letter">{letter}</span>
              ) : (
                <span key={i} className="blankSquare"></span>
              )
            )}

          </div>
          <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text" 
                name="letter" 
                maxLength="1" 
                required 
                onChange={(e) => setLetter(e.target.value)} 
                value={letter} 
                ref={letterImputRef} 
              />
              <button>Jogar!</button>
            </form>
          </div>
          <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>

            {wrongLetters.map((letter, i) => (
              <span key={i}>{letter.toUpperCase()}, </span>

            ))}
          </div>
      </div>
  );
}

export default Game;
