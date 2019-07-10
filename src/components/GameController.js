// TODO: - age to n
//       - performance optimze (no violation msg)

import React from "react";
import { connect } from "react-redux";
import { CellGrid, getNextBoard, generationView } from "./GameBoard";
import { getGame, getRules, sendGame } from "../actions";
import { ActionButtons } from "./ActionButtons";
import InfoView from "./InfoView";
class GameController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      generation: 0,
      viewDetails: false
    };
    this.timer = undefined;
  }

  handleSend = () => {
    const { url, challenge } = this.state;
    const { cells } = challenge;
    this.props.sendGame(url, { cells });
  };

  updateBoard = () => {
    const { challenge, generation } = this.state;
    Promise.resolve(getNextBoard(challenge)).then(challenge => {
      const gen = generation + 1;
      this.setState({ challenge, generation: gen });
    });
  };

  tick = () => {
    const { running } = this.state;
    if (running) {
      this.timer = setInterval(this.updateBoard, 100);
    } else {
      clearInterval(this.timer);
    }
  };

  ageToCompletion = () => {
    const { challenge, generation } = this.state;
    if (generation < challenge.generation) {
      this.updateBoard().then(this.ageToCompletion());
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { Challenge } = this.props;
    if (Challenge !== prevProps.Challenge && Challenge) {
      this.setState({ challenge: Challenge });
    }
    if (prevState.running !== this.state.running) {
      this.tick();
    }
  }
  // on mount: initialize and run
  componentDidMount() {
    this.props.getRules();
    this.handleNext();
  }

  handleNext = () => {
    this.props.getGame();
  };
  restartBoard = () => {
    this.setState({ challenge: this.props.Challenge, generation: 0 });
  };
  handleRun = () => {
    const { running } = this.state;
    this.setState({ running: !running });
  };

  render() {
    const { challenge, viewDetails, generation } = this.state;
    const rules = challenge ? challenge.rules : null;
    const cells = challenge ? challenge.cells : null;
    const age = generation ? generation : 0;

    return (
      <div className="appWrap">
        <label className="named">{rules ? rules.name : ""}</label>
        <ActionButtons
          send={this.handleSend}
          run={this.handleRun}
          restart={this.restartBoard}
          next={this.handleNext}
        />
        <CellGrid cells={cells} handleClick={this.handleRun} />
        <InfoView rules={rules} show={viewDetails}>
          {generationView(age)}
        </InfoView>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    Challenge: state.challenge,
    ruleList: state.ruleList
  };
}
export default connect(
  mapStateToProps,
  { getGame, getRules, sendGame }
)(GameController);
