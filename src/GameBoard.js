import React from "react";
const Cell = state => {
  return <div className={`cell ${state.alive}`} />;
};
class GameBoard extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.board !== this.props.board && this.props.board) {
      console.log(this.props.board);
      this.setState({ rows: this.props.board });
    }
  }

  getRows() {
    this.state.rows.map(row => {
      return <Cell>{row}</Cell>;
    });
  }
  render() {
    return (
      <div className="game">
        {this.props.board
          ? this.props.board.map(row => {
              return <Cell alive={row === 0} />;
            })
          : null}
      </div>
    );
  }
}
export default GameBoard;
