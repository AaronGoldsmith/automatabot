import React from "react";
// import { Board } from "../models";
// import { connect } from "react-redux";
// import { getGame } from "../actions";
// const Board = require("../models/Board").default;
const Cell = ({ alive }) => <div className={`cell ${alive ? "o" : "x"}`} />;
const CellRow = (cells, row) => {
  return (
    <div className={`cell-row row-${row}`}>
      {cells.map((cell, n) => (
        <Cell key={n} alive={cell} />
      ))}
    </div>
  );
};
const CellGrid = ({ rows }) => {
  return rows ? rows.map((cells, i) => CellRow(cells, i)) : null;
};

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      automata: undefined,
      cells: []
    };
  }
  // ageToCompletion() {
  //   const { automata } = this.state;
  //   const { generations } = this.props;
  //   let age = 0;
  //   while (age < generations) {
  //     this.setState({ automata: automata.getNextBoard() });
  //     age++;
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.board !== prevProps.board && this.props.board) {
      // const automata = new Board(this.props.board);
      this.setState({ cells: this.props.board });
    }
    if (this.props.generations !== prevProps.generations) {
      const { generations } = this.props;
      this.setState({ generations });
    }
  }

  render() {
    const { cells } = this.state;
    return cells.length > 0 ? <CellGrid rows={cells} /> : null;
  }
}
export default GameBoard;
