import React from "react";

export const Button = ({ handler, text }) => {
  return (
    <button className="dflt-btn" onClick={handler}>
      {text}
    </button>
  );
};
export const ActionButtons = ({ send, run, next, ...props }) => {
  return (
    <div className="actnBtns">
      <Button handler={next} text="new" />
      <Button handler={run} text={props.running ? "stop" : "start"} />
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
