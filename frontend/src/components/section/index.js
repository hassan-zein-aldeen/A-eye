import React, { useEffect } from "react";
import "./section.css";
import Card from "../Card";
import TextContent from "../TextContent";

const Section = () => {

  useEffect(() => {
    const text = document.querySelector('.title');
    const section = document.querySelector(`.section`);
    const icon_card = document.querySelector('.iconcard');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const textHeight = text.offsetHeight;

      if (sectionTop < (window.innerHeight) && window.innerHeight >= 0) {
        const maxTranslateY = (sectionHeight - textHeight) / 2;

        const scrollPercentage = (sectionHeight - scrollPosition) / sectionHeight;
        let translateY = ((textHeight + 400) * scrollPercentage) * 0.5; //speed scrolling for items
        translateY = Math.min(translateY, maxTranslateY);
        translateY = Math.max(translateY, -60);
        text.style.transform = `translateY(${translateY + 100}px)`; //original position
        icon_card.style.transform = `translateY(${translateY - 50}px)`; // original position
        icon_card.classList.add('show');
        section.classList.add('show');
      } else {
        section.classList.remove('show');
        icon_card.classList.remove('show');
      }
    });
  }, );

  const cardData =
  {
    text1: 'Why A-Eye?',
    icon1: require("../../icons/visibility.svg").default,

    text2: 'Statistics',
    icon2: require("../../icons/leaderboard.svg").default,

    text3: 'Customers',
    icon3: require("../../icons/face.svg").default,
  };

  const content =
  {
    txtC1: "* Target audience ads allow you to tailor your message " +
      "specifically to your ideal customer, increasing the chances " +
      "that they will engage with your brand.<br/></br>" +
      "*<a className='source' href='https://images.forbes.com/forbesinsights/StudyPDFs/Quantcast_ReachingTheRightAudience-REPORT.pdf' target='_blank'>Study</a> published by Forbs showed that " +
      "targeted ads are more effective in generating conversions than non-targeted ads.</br></br>" +
      "* All of our customers are mall shop owners who have stores within the shopping center.",
    iconC1: require("../../icons/Group.svg").default,
    linkC1: 'Start Your Journey',
  };

  return (
    <>
      <div className="section">
        <div className="subsec"></div>
      <p className="title">Target Audience</p>
      <div className="iconcard">
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
    </div >
      <div className="sec_text">
        <TextContent
          txtC1={content.txtC1}
          iconC1={content.iconC1}
          linkC1={content.linkC1}
        />
      </div>
    </>
  );
}

export default Section;