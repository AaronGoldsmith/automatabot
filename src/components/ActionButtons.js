import React from "react";

export const Button = ({ handler, text }) => {
  return (
    <button className="dflt-btn" onClick={handler}>
      {text}
    </button>
  );
};
export const ActionButtons = ({ restart, run, next }) => {
  return (
    <div className="actnBtns">
      <Button handler={next} text="random" />
      <Button handler={restart} text={"replay"} />
    </div>
  );
};

// future implementation
//eslint-disable-next-line
const sendButtons = ({ send }) => (
  <div>
    Age to completion...
    <Button handler={send} text="send" />
  </div>
);
