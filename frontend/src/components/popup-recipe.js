import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-recipe">
      <div className="popup-recipe-box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;