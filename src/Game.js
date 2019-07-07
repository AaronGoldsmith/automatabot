import React from "react";
import { getGame, sendGame } from "./AutomataBot";
import GameBoard from "./GameBoard";
import Board from "./Board";

const domain = "https://api.noopschallenge.com";
const path = "/automatabot/challenges/start"; //   or new

class Game extends React.Component {
  startGame() {
    const url = [domain, path].join("");
    const GOL = getGame(url).then(board => {
      const GOL = new Board(board);
      let age = 0;
      while (age < board.generations) {
        GOL.board = GOL.getNextBoard();
        age++;
      }
      console.log(GOL.toString());
      return GOL;
      // UNCOMMENT TO SEND
      // sendGame(url, GOL.board)
    });
    this.setState({ GOL });
  }
  componentDidMount() {
    // initialize and run
    this.startGame();
    this.setState({ GOL: [] });
  }

  render() {
    const GOL = this.state && this.state.GOL ? this.state.GOL : null;
    return <GameBoard board={GOL} />;
  }
}
export default Game;
