// Generic automata board
class Board {
  constructor(challenge) {
    this.challenge = challenge;
  }

  getNextBoard() {
    return this.board.map((_, row) => this.getNextRow(row));
  }

  getNextRow(n) {
    const cells = this.challenge.cells[n];
    const { birth, survival } = this.challenge.rules;
    return cells.map((_, i) => {
      const neighbors = this.getNeighbors(n, i);

      //  alive or dead state of neighbors -> filter out alive neighbors
      const neighborStates = neighbors.map(
        neighbor => this.board[neighbor.x][neighbor.y]
      );
      const aliveCount = neighborStates.filter(cell => cell === 1).length;

      // return state of next cell at [n][i]
      if (this.challenge.cells[n][i] === 1)
        return survival.includes(aliveCount) ? 1 : 0;
      else return birth.includes(aliveCount) ? 1 : 0;
    });
  }

  getNeighbors(row, col) {
    let neighbors = [];
    const cells = this.challenge.cells;
    const size = cells.length;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (row === i && col === j) {
        } //console.log("\n")
        else if (i >= 0 && j >= 0 && i < size && j < cells[j].length)
          neighbors.push({ x: i, y: j });
      }
    }
    return neighbors;
  }
  toString() {
    return this.challenge.cells.map(row =>
      row
        .join("")
        .replace(/0/g, " ")
        .replace(/1/g, "⦿")
    );
  }
}
export default Board;
