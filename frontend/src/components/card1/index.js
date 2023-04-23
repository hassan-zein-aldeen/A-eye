import React from "react";
import './card.css';
import icon1 from "../../icons/face.svg";
import icon2 from "../../icons/leaderboard.svg";
import icon3 from "../../icons/visibility.svg";

const Card1 = () => {

  return (
    <div className="card_content">
      <div className="row_content">
        <img className="vis_icon" src={icon3} alt="visibility" />
        <p className="vis_txt">Why A-Eye?</p>
      </div>
      <div className="row_content">
        <img className="lead_icon" src={icon2} alt="leaderboard" />
        <p className="lead_txt">Statistics</p>
      </div>
      <div className="row_content">
        <img className="face_icon" src={icon1} alt="face" />
        <p className="face_txt">Customers</p>
      </div>
    </div>
  );
}

export default Card1;

