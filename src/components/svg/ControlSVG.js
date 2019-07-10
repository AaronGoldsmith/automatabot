import React from "react";
const ControlSVG = props => (
  <div className={"controls"} {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#000000" d="M3,5V19L11,12M13,19H16V5H13M18,5V19H21V5" />
    </svg>
  </div>
);

export default ControlSVG;
