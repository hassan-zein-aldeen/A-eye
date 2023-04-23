import React from "react";
import './card.css';

const Card = ({text1, text2, text3, icon1, icon2, icon3}) => {

  return (
    <div className="card_content">
      <div className="row_content">
        <img src={icon1} alt="" />
        <p>{text1}</p>
      </div>
      <div className="row_content">
        <img src={icon2} alt="" />
        <p>{text2}</p>
      </div>
      <div className="row_content">
        <img src={icon3} alt="" />
        <p>{text3}</p>
      </div>
    </div>
  );
}

export default Card;
