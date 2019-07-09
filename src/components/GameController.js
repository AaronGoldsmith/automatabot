// TODO: - age to n
//       - performance optimze (no violation msg)
//       - check on functionality of play / pause

import React from "react";
import { connect } from "react-redux";
import { CellGrid, getNextBoard } from "./GameBoard"
import { getGame, sendGame } from "../actions";

// handleSend = () => {
//   // deconstruct from state
//   const { url, automata } = this.state;
//   const { board } = automata;
//   return this.props.handleSend(url, board);
// };


class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = { running: false, generation: 0 };
    this.timer = undefined;
    this.age = 0;
  }

  handleSend = () => {
    // deconstruct from state
    const { url, challenge } = this.state;
    const { cells } = challenge;
    this.props.sendGame(url, { cells });
  };
  updateBoard = () => {
    const { challenge, generation } = this.state;
    Promise.resolve(getNextBoard(challenge)).then(challenge => {
      const gen = generation + 1;
      this.setState({ challenge, generation: gen })
    })
  }

  tick = () => {
    const { running } = this.state;

    if (!this.timer && running) {
      this.timer = setInterval(this.updateBoard, 100)
    }
    else { this.tock() }
  }

  tock() { clearInterval(this.timer) }

  ageToCompletion = () =>  {
    const { challenge, generation } = this.state;
      if(generation < challenge.generation){
        this.updateBoard().then(this.ageToCompletion())
      }
    }




  componentDidUpdate(prevProps, prevState) {
    if (this.props.Challenge !== prevProps.Challenge && this.props.Challenge) {
      this.setState({ challenge: this.props.Challenge });
    }
    if (prevState.running !== this.state.running) {
      this.tick();
    }
  }

  // on mount: initialize and run
  componentDidMount() {
    this.props.getGame();
  }
  handleRun = () => {
    const { running } = this.state
    this.setState({ running: !running })
  }

  render() {
    const { challenge, running } = this.state;
    const cells = challenge ? challenge.cells : null;
    const ageTo = challenge ? challenge.generations : 0;
    return (
      <React.Fragment>
        <CellGrid cells={cells} />
        {/* <GameBoard challenge={challenge} running={running} /> */}
        <button onClick={this.handleSend}>send</button>
        <button onClick={this.handleRun}>{running ? 'pause' : 'start'}</button>
        {/* <button onClick={this.ageToCompletion}>{`age to ${ageTo}`}</button> */}

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
