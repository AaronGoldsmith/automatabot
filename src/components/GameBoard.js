import React, {useEffect, useState, useCallBack} from "react";

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
export const CellGrid = (props) =>{
  return props.cells ? props.cells.map((cells, i) => CellRow(cells, i)) : null;
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
      running: false
    };
    // this.timer;
  }


  componentDidMount(){
    this.timer=  setInterval(this.tick(), 1000);
  }
  tick = () =>{
    !this.state.running && this.props.updateCells();
  }

  componentDidUpdate(prevProps) {
    if(this.props.challenge !== prevProps.challenge){
      const {challenge} = this.props
      this.setState({
        rules: challenge.rules,
        cells: challenge.cells,
        generations: challenge.generations
      })
    }

    if(this.props.running !== prevProps.running){
      this.setState({running: this.props.running})
    }
  }
  getNextBoard(){
    const {cells} = this.state
    try {
        let cellMap = cells.map((_, row) => this.getNextRow(row));
        this.setState({cells: cellMap})
    }
    catch(err){
      console.log(err)
    }
  }

  getNextRow = (n) => {
    const {cells, rules} = this.state;
    const row = cells[n];
    const { birth, survival } = rules;
    return row.map((_, i) => {
      const neighborStates = this.getNeighbors(n, i). map(
        neighbor => cells[neighbor.x][neighbor.y]
      );
      const aliveCount = neighborStates.filter(cell => cell === 1).length;

      // return state of next cell at [n][i]
      if (row[i] === 1)
        return survival.includes(aliveCount) ? 1 : 0;
      else return birth.includes(aliveCount) ? 1 : 0;
    });
  }

  getNeighbors = (row, col) => {
    const {cells} = this.state;
    let neighbors = [];
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

  render() {
    const { cells, running } = this.state;
    return <CellGrid cells={cells} running={running} /> 
  }
}
export default GameBoard;
