import React from "react";
import { connect } from "react-redux";
import { getGame } from "../actions";
// import Board from "../models/Board";

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
    this.state = { automata: undefined, url: undefined };
  }
  handleSend = () => {
    // deconstruct from state
    const { url, automata } = this.state;
    const { board } = automata;
    this.props.sendGame(url, board);
  };

  componentDidUpdate(prevProps) {
    if (this.props.Challenge !== prevProps.Challenge) {
      // console.log(this.props.Challenge);
      this.setState({ challenge: this.props.Challenge });
    }
  }

  // on mount: initialize and run
  componentDidMount() {
    this.props.getGame();
  }

  render() {
    const { challenge } = this.state;
    const cells = challenge ? challenge.cells : null;
    const ageTo = challenge ? challenge.generations : 0;
    return (
      <React.Fragment>
        <GameBoard board={cells} generations={ageTo} />
        <button onClick={this.handleSend}>send</button>
        <button onClick={this.run}>run</button>
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
  { getGame }
)(GameController);
