import React, { useEffect } from "react";
import "./section.css";
import Card from "../Card";
import TextContent from "../TextContent";


const Section = () => {

  useEffect(() => {
    const text = document.querySelector('.title');
    const section = document.querySelector('.section');
    const cc = document.querySelector('.iconcard');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const sectionHeight = section.offsetHeight;
      const textHeight = text.offsetHeight;

      if (sectionTop < (window.innerHeight * 2) && sectionBottom > 0) {
        const maxTranslateY = (sectionHeight - textHeight) / 2;
        const scrollPercentage = (sectionHeight - scrollPosition) / sectionHeight;
        let translateY = (textHeight + 300) * scrollPercentage;
        translateY = Math.min(translateY, maxTranslateY);
        translateY = Math.max(translateY, -100);
        text.style.transform = `translateY(${translateY + 100}px)`;
        cc.style.transform = `translateY(${translateY + 20}px)`;
        cc.classList.add('show');
        section.classList.add('show');
      } else {
        section.classList.remove('show');
        cc.classList.remove('show');
      }
    });
    return () => window.removeEventListener('scroll', () => { });
  }, []);



  const cardData1 =
  {
    text1: 'Why A-Eye?',
    icon1: require("../../icons/visibility.svg").default,

    text2: 'Statistics',
    icon2: require("../../icons/leaderboard.svg").default,

    text3: 'Customers',
    icon3: require("../../icons/face.svg").default,
  };

  const content1 =
  {
    txtC1: "* Target audience ads allow you to tailor your message " +
      "specifically to your ideal customer, increasing the chances " +
      "that they will engage with your brand.<br/></br>" +
      "* Study by e-Marketer showed that " +
      "targeted ads are 2-3 times more effective in generating conversions than non-targeted ads.</br></br>" +
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
              text1={cardData1.text1}
              text2={cardData1.text2}
              text3={cardData1.text3}
              icon1={cardData1.icon1}
              icon2={cardData1.icon2}
              icon3={cardData1.icon3}
            />
          </div>
        </div>
      </div>
      <div className="sec_text">
        <TextContent
          txtC1={content1.txtC1}
          iconC1={content1.iconC1}
          linkC1={content1.linkC1}
        />
      </div>
    </>
  );
}

export default Section;