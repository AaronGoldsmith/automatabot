import React from "react";

const Cell = ({ alive }) => <div className={`cell ${alive ? "o" : "x"}`} />;
const CellRow = (cells, row) => {
  return (
    <div key={row} className={`cell-row row-${row}`}>
      {cells.map((cell, n) => (
        <Cell key={n} alive={cell} />
      ))}
    </div>
  );
};

export const CellGrid = ({ cells }) => {
  return cells ? cells.map((cellList, i) => CellRow(cellList, i)) : null;
};

export const getNextBoard = (challenge) => new Promise(resolve => {
  const cells = challenge.cells.map((_, row) => getNextRow(row, challenge));
  const newBoard = { ...challenge, cells }
  resolve(newBoard)
})

const getNextRow = (n, challenge) => {
  const { rules, cells } = challenge;
  const { birth, survival } = rules;

  const row = cells[n];
  return row.map((_, i) => {
    const neighborStates = getNeighbors(n, i, cells).map(
      neighbor => cells[neighbor.x][neighbor.y]);
    const aliveCount = neighborStates.filter(cell => cell === 1).length;

    // return state of next cell at [n][i] = row[i]
    if (row[i] === 1)
      return survival.includes(aliveCount) ? 1 : 0;
    else return birth.includes(aliveCount) ? 1 : 0;
  });
}

function getNeighbors(row, col, cells) {
  let neighbors = [];

  const size = cells ? cells.length : 0
  const length = cells ? cells[0].length : 0

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (row !== i || col !== j) {
        if (row > 0 && j >= 0 && i < size && j < length)
          neighbors.push({ x: i, y: j });
      }

    }
  }
  return neighbors;
}