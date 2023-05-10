import React, { useEffect, useRef, useState } from 'react';
import Card from "../Card";
import TextContent from "../TextContent";
import "./section2.css";
import visualImg from "../../images/visual.svg";


const Section2 = () => {

  const cardData =
  {
    text1: 'Visual appeal',
    icon1: require("../../icons/color.svg").default,

    text2: 'Clear messaging',
    icon2: require("../../icons/text.svg").default,

    text3: 'Call to action',
    icon3: require("../../icons/campaign.svg").default,
  };

  const content =
  {
    txtC1: "* Visual appearance is an important aspect of creating effective ads," +
      "as it can capture attention and influence the perception of your brand.<br/><br/>" +
      "* Clear messaging is vital for effective ads, conveying the benefits of your" +
      " product or service in a way that drives action from your audience.<br/><br/>" +
      "* A strong call to action is crucial for ads as it motivates your audience" +
      "to engage with your product or service.<br/><br/>",
    iconC1: require("../../icons/add_box.svg").default,
    linkC1: 'Create your Ads',
  };

  return (
    <>
      <div className="section_ads">
        <div className="subsec_ads"></div>
        <p className="title_ads">Add Ads</p>
        <div className="iconcard_ads">
          <div className='j_card2'>
            <Card
              text1={cardData.text1}
              text2={cardData.text2}
              text3={cardData.text3}
              icon1={cardData.icon1}
              icon2={cardData.icon2}
              icon3={cardData.icon3}
            />
          </div>
        </div>
      </div>
      <div className="sec_textads">
        <TextContent
          txtC1={content.txtC1}
          iconC1={content.iconC1}
          linkC1={content.linkC1}
        />
        <img className='visual' src={visualImg} />
      </div>
    </>
  );
}

export default Section2;


