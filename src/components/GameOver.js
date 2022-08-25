import "./GameOver.css";

function GameOver({ retry, score, pickedWord }) {
  return (
      <dir>
          <h1>Fim de Jogo</h1>
          <h2>A palavra era: {pickedWord}</h2>
          <h2>A sua pontuação foi: <span>{score}</span></h2>
          
          <button onClick={retry}>Voltar ao início</button>

      </dir>
  );
}

export default GameOver;