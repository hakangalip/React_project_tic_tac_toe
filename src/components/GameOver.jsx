export default function GameOver({ winner, onRestart }) {
// const [reset, setReset] = useState()
  return <div id="game-over">
      <h2>Game over</h2>
      {winner && <p>{winner} won</p>}
      {!winner && <p>It is a draw</p>}
       <p> <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
}
