import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

function Game() {
  var [param, setparam] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        position: 0,
        color: [undefined, undefined, undefined],
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });
  function Square({ value, onClick, index }) {
    return (
      <button
        style={{
          backgroundColor:
            param.history[param.stepNumber].squares[
              param.history[param.stepNumber].color[0] === value
            ] === value ||
            param.history[param.stepNumber].squares[
              param.history[param.stepNumber].color[1]
            ] === value ||
            param.history[param.stepNumber].squares[
              param.history[param.stepNumber].color[2]
            ] === value
              ? "#008000"
              : undefined,
        }}
        className="square"
        color={index}
        onClick={() => onClick(index)}
      >
        {value}
      </button>
    );
  }
  function Board({ squares, onClick }) {
    var itera = -1;
    //const [itera, setitera] = useState(itera);
    let a = Array(3).fill(null);
    let b = Array(3).fill(null);

    return a.map((number) => (
      <div className="board-row">
        {b.map((number) => {
          itera++;
          return (
            <Square
              key={itera}
              index={itera}
              value={squares[itera]}
              onClick={onClick}
            />
          );
        })}
      </div>
    ));
  }
  //const [color, setcolor] = useState(param.history[param.stepnumber]);
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        param.history[param.stepNumber].color = [a, b, c];
        return squares[a];
      }
    }
    return null;
  }
  const handleClick = (i) => {
    const history = param.history.slice(0, param.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    //console.log(squares);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = param.xIsNext ? "X" : "O";
    setparam(() => {
      return {
        history: history.concat([
          {
            squares: squares,
            position: i,
            color: [undefined, undefined, undefined],
          },
        ]),
        stepNumber: history.length,
        xIsNext: !param.xIsNext,
      };
    });
  };

  function jumpTo(step) {
    setparam((prevState) => {
      return {
        ...prevState,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      };
    });
  }
  const history = param.history;
  const current = history[param.stepNumber];
  const winner = calculateWinner(current.squares);
  //debugger;
  const moves = history.map((step, move) => {
    const desc = move
      ? "position : line : " +
        parseInt(param.history[move].position / 3 + 1) +
        " column : " +
        ((param.history[move].position % 3) + 1)
      : "Go to game start";
    return (
      <li key={move}>
        <button
          style={{
            fontWeight: param.stepNumber === move ? 600 : 400,
          }}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });
  //debugger;
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (param.history.length > 9) {
    status = "Draw";
  } else {
    status = "Next player: " + (param.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="gameboardinfo">
        <div className="textbox">
          <input
            type="text"
            placeholder="Give the size of the table"
            name="Mainlink"
          ></input>
        </div>

        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </div>
        <button className="chlong">Accept</button>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Game />, document.getElementById("root"));
