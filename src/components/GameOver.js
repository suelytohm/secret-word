import "./GameOver.css"

function GameOver({ retry }) {
  return (
      <dir>
          <h1>Fim de Jogo</h1>
          <button onClick={retry}>Voltar ao início</button>

      </dir>
  );
}

export default GameOver;