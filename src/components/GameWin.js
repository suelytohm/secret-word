import "./GameOver.css";

function GameOver({ retry, score }) {
  return (
      <dir>
          <h1>Parabéns!!</h1>
          <button onClick={retry}>Próxima Palavra</button>

      </dir>
  );
}

export default GameOver;