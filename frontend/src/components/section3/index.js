import React from "react";
import Card from "../Card";
import TextContent from "../TextContent";
import "./section3.css";
import planImg from "../../images/plan.svg";


const Section3 = () => {

  const cardData =
  {
    text1: 'See Results',
    icon1: require("../../icons/results.svg").default,

    text2: 'Read Numbers',
    icon2: require("../../icons/numbers.svg").default,

    text3: 'Work with Plan',
    icon3: require("../../icons/plan.svg").default,
  };

  const content =
  {
    txtC1: "* Visual appearance is an important aspect of creating effective ads," +
      "as it can capture attention and influence the perception of your brand.<br/><br/>" +
      "* Clear messaging is vital for effective ads, conveying the benefits of your" +
      " product or service in a way that drives action from your audience.<br/><br/>" +
      "* A strong call to action is crucial for ads as it motivates your audience" +
      "to engage with your product or service.<br/><br/>",
    iconC1: require("../../icons/menu.svg").default,
    linkC1: 'Results of Campaigns',
  };

  return (
    <>
      <div className="section_res">
        <div className="subsec_res"></div>
        <p className="title_res">Show Results</p>
        <div className="iconcard_res">
          <div>
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
      <div className="sec_textres">
        <img className="plan" src={planImg} />
        <TextContent
          txtC1={content.txtC1}
          iconC1={content.iconC1}
          linkC1={content.linkC1}
        />
      </div>
    </>
  );
}

export default Section3;


