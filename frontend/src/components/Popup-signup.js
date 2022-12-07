import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box-sign">
      <div className="box-sign">
        <span className="close-icon-sign" onClick={event =>  window.location.href='/'}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;