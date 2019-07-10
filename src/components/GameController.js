// TODO: - age to n
//       - performance optimze (no violation msg)

import React from "react";
import { connect } from "react-redux";
import { CellGrid, getNextBoard, generationView } from "./GameBoard";
import { getAnyGame, getRules, sendGame } from "../actions";
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
    const { URL, challenge } = this.state;
    const { cells } = challenge;
    console.log(URL);
    this.props.sendGame(URL, cells);
  };

  updateBoard = () => {
    const { challenge, generation } = this.state;
    Promise.resolve(getNextBoard(challenge)).then(challenge => {
      console.log(challenge);
      const gen = generation + 1;
      this.setState({ challenge, generation: gen });
    });
  };

  tick = () => {
    const { running } = this.state;
    if (running) {
      this.timer = setInterval(this.updateBoard, 200);
    } else {
      clearInterval(this.timer);
    }
  };

  ageToCompletion = () => {
    const { challenge, generation } = this.state;
    while (generation < challenge.generation) {
      this.updateBoard();
    }
    this.handleSend();
  };

  componentDidUpdate(prevProps, prevState) {
    const { Challenge, RuleList, URL } = this.props;
    if (Challenge !== prevProps.Challenge && Challenge) {
      this.setState({ challenge: Challenge });
    }
    if (prevState.running !== this.state.running) {
      this.tick();
    }
    if (prevProps.RuleList !== RuleList && RuleList) {
      this.setState({ ruleList: RuleList });
    }
    if (prevProps.URL !== URL && URL) {
      this.setState({ URL: `${URL}` });
    }
  }

  // on mount: initialize and run
  componentDidMount() {
    this.setup();
  }
  setup = () => {
    this.props.getRules();
    this.props.getAnyGame();
  };
  handleNext = () => {
    this.props.getAnyGame();
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
    return (
      <div className="appWrap">
        <label className="named">{rules ? rules.name : ""}</label>
        <ActionButtons
          send={this.handleSend}
          ageToCompletion={this.ageToCompletion}
          restart={this.restartBoard}
          next={this.handleNext}
        />
        <CellGrid cells={cells} handleClick={this.handleRun} />
        <InfoView rules={rules} show={viewDetails}>
          {generationView(generation)}
        </InfoView>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Challenge: state.challenge,
    RuleList: state.ruleList,
    URL: state.path,
    Result: state.result
  };
}

export default connect(
  mapStateToProps,
  { getAnyGame, getRules, sendGame }
)(GameController);
