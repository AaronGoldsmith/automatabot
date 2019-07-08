import React from "react";
import { connect } from "react-redux";
import {CellGrid} from "./GameBoard"
import { getGame, sendGame } from "../actions";
import Board from "../models/Board";

import GameBoard from "./GameBoard";

// const domain = "https://api.noopschallenge.com";
// const path = "/automatabot/challenges/start"; //   or new

// handleSend = () => {
//   // deconstruct from state
//   const { url, automata } = this.state;
//   const { board } = automata;
//   return this.props.handleSend(url, board);
// };

class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  challenge: {}};
    this.cellgrid = null;
    this.timer = undefined
  }
  handleSend = () => {
    // deconstruct from state
    const { url, challenge } = this.state;
    const { cells } = challenge;
    this.props.sendGame(url, {cells});
  };

  tick(){
    !this.state.running && this.props.updateCells();
  }
  tock=()=>{
    clearInterval(this.timer)
  }
  ageToCompletion = () => {
    this.setState({running: true})

    // const { generations } = this.props;
    // let age = 0;
    // while (age < generations) {
    //   const cells = board.getNextBoard();
    //   const challenge = {...this.state.challenge, cells};

    //   this.setState({ challenge});
    //   age++;
    // }
  }
  getNextBoard = async () =>{
    try {
        let cells = await this.state.challenge.cells.map((_, row) => this.getNextRow(row));
        const challenge = {...this.state.challenge, cells}
        this.setState({challenge})
    }
    catch(err){
      console.log(err)
    }
  }

  getNextRow = (n) => {
    const {cells, rules} = this.state.challenge;
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
    const {cells} = this.state.challenge;
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.Challenge !== prevProps.Challenge && this.props.Challenge) {
      this.setState({ challenge: this.props.Challenge });
    }
    if(prevState.running !== this.state.running){
      if(this.state.running) this.tick();
      else this.tock()
    }
  }

  // on mount: initialize and run
  componentDidMount() {
    this.props.getGame();
    this.forceUpdate()

  }
  handleRun = () => {
    const {running} = this.state
    this.setState({running: !running})
  }

  render() {
    const { challenge, running } = this.state;
    // const cells = challenge ? challenge.cells : null;
    // const ageTo = challenge ? challenge.generations : 0;
    return (
      <React.Fragment>
        <GameBoard challenge={challenge} updateCells={this.getNextBoard} />
        <button onClick={this.handleSend}>send</button>
        <button onClick={this.getNextBoard}>run</button>
        </React.Fragment>
    );
  }
}
// export default Game;
function mapStateToProps(state) {
  return {
    Challenge: state.challenge
  };
}
export default connect(
  mapStateToProps,
  { getGame, sendGame }
)(GameController);
