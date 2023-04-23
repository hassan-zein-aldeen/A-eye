import React from "react";
import './card.css';
import icon1 from "../../icons/face.svg";
import icon2 from "../../icons/leaderboard.svg";
import icon3 from "../../icons/visibility.svg"

const Card = () => {

  return (
    <div className="card_content">
      <div>
        <img className="vis_icon" src={icon1} alt="visibility.svg" />
        <p className="vis_txt">Why A-Eye?</p>
      </div>
      <div>
        <img className="lead_icon" src={icon2} alt="leaderboard.svg" />
        <p className="lead_txt">Statistics</p>
      </div>
      <div>
        <img className="face_icon" src={icon3} alt="face.svg" />
        <p className="face_txt">Customers</p>
      </div>
    </div>
  );
}

export default Card;

