import React from "react";
 
const Popuprecipe = (props) => {
  return (
    <div className="popup-recipe">
      <div className="popup-recipe-box">
        <span className="close-icon-recipe" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popuprecipe;