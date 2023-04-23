import React from "react";
import '../card1/card.css';
import icon1 from "../../icons/campaign.svg";
import icon2 from "../../icons/text.svg";
import icon3 from "../../icons/color.svg";

const Card2 = () => {

  return (
    <div className="card_content">
      <div className="row_content">
        <img className="vis_icon" src={icon3} alt="color" />
        <p className="vis_txt">Visual appeal</p>
      </div>
      <div className="row_content">
        <img className="lead_icon" src={icon2} alt="text" />
        <p className="lead_txt">Clear messaging</p>
      </div>
      <div className="row_content">
        <img className="face_icon" src={icon1} alt="campaign" />
        <p className="face_txt">Call to action</p>
      </div>
    </div>
  );
}

export default Card2;

