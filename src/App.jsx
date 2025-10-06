import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winningConditions";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

let INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
// The trick on this application is to derive the gameBoard settings for the player from the gameTurns

function activeDerivedPlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
  // We bring the game board and the game turns together
  // The board will updated, but the origin address in memory stays like it is
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    // This is the place were we get the winner
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      // The winner is equal to the second and third combination
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      // We use this information to set our dynamically derived winning player
      // it's a bittle lit tricky
    }
  }
  return winner;
}

function App() {
  
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  // These are the GameTurns, not the GameBoard

  let activePlayer = activeDerivedPlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  // const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {

      let currentPlayer = activeDerivedPlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleReset() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
        // brackets means that symbol is set as newName, (symbol is a dynamic property,
        // the value is not known before)
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <h3>
            <GameOver onRestart={handleReset} winner={winner} />
          </h3>
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
