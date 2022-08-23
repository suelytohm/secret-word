import "./Game.css"


function Game({verifyLetter}) {
  return (
      <div className="game">
          <h1>Início do Jogo</h1>
          <button onClick={verifyLetter}>Finalizar o jogo</button>

      </div>
  );
}

export default Game;
