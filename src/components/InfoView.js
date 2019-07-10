import React, { useState } from "react";
import "./Info.css";

const InfoDetail = ({ name, arr }) => {
  const vals = arr && arr.length > 0 ? arr : ["N/A"];
  return (
    <div className={`detail-${name}`}>
      <p id={`items-${name}`}>
        <span id={`detailName`}>{name}</span>
        {vals.join(", ")}
      </p>
    </div>
  );
};
function ViewDetails({ children }) {
  const [detail, setDetail] = useState(false);
  const handleClick = () => {
    setDetail(!detail);
  };
  return (
    <React.Fragment>
      <span className="clickable line" onClick={handleClick}>
        {detail ? "hide" : "view details"}
      </span>
      {detail && children}
    </React.Fragment>
  );
}
const InfoView = ({ rules, show, children }) => {
  const visible = show ? "long" : "short";
  return (
    rules && (
      <div className="info">
        {children}
        <ViewDetails>
          <div className={`rules ${visible}`}>
            <InfoDetail name={"birth"} arr={rules.birth} />
            <InfoDetail name={"survival"} arr={rules.survival} />
          </div>
        </ViewDetails>
      </div>
    )
  );
};
export default InfoView;
