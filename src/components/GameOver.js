import "./GameOver.css";

function GameOver({ retry, score }) {
  return (
      <dir>
          <h1>Fim de Jogo</h1>
          <h2>A sua pontuação foi: <span>{score}</span></h2>
          <button onClick={retry}>Voltar ao início</button>

      </dir>
  );
}

export default GameOver;