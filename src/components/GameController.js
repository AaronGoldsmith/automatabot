// TODO: - age to n
//       - performance optimze (no violation msg)
//       - display game info
import React from "react";
import { connect } from "react-redux";
import { CellGrid, getNextBoard } from "./GameBoard"
import { getGame, sendGame } from "../actions";
import InfoView from "./InfoView"

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
  }

  handleSend = () => {
    const { url, challenge } = this.state;
    const { cells } = challenge;
    this.props.sendGame(url , { cells });
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
    if (running) {
        this.timer = setInterval(this.updateBoard, 100)
    }
    else { clearInterval(this.timer) }
  }

  ageToCompletion = () =>  {
    const { challenge, generation } = this.state;
      if(generation < challenge.generation){
        this.updateBoard().then(this.ageToCompletion())
      }
    }


  componentDidUpdate(prevProps, prevState) {
    const {Challenge} = this.props;
    if (Challenge !== prevProps.Challenge && Challenge) {
      console.log(Challenge.rules)
      this.setState({ challenge: Challenge });
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
    const rules = challenge ? challenge.rules : null;
    const cells = challenge ? challenge.cells : null;
    return (
      <div className="appWrap">
      <div className="cellWrap">
        <CellGrid cells={cells} />
      </div>
       

        <InfoView rules={rules} />
           
        <div className="actnBtns">
            <button onClick={this.handleSend}>send</button>
            <button onClick={this.handleRun}>{running ? 'pause' : 'start'}</button>
          </div>
      </div>
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
