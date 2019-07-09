 import React from "react"
 const InfoView = ({rules, children}) => {
  return (
    rules &&
    <div className="info">
      {children}
      <label className="named">{rules.name}</label>
         <label>birth</label><p> {rules.birth.join(", ")}</p>
         <label >survival</label> <p>{rules.survival.join(", ")}</p>
    </div>
  )
}
export default InfoView;