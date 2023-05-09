import Header from "../../components/Header/header";
import Video from "../../video/high.mp4";
import Section from "../../components/section";
import Section2 from "../../components/section2";
import Section3 from "../../components/section3";
import image1 from "../../images/zara.svg";
import image2 from "../../images/lac.svg";
import image3 from "../../images/guc.svg";
import image4 from "../../images/pull.svg";
import image5 from "../../images/kids.svg";
import Footer from "../../components/Footer";
import Slideshow from "../../components/Slideshow";
import './home.css';
import { useState, useEffect } from "react";



const Home = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);

  const handleRedirectAd = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      window.location.href = "http://localhost:3001/User/";
    } else {
      window.location.href = "http://localhost:3001/login";
    }
  }


  const handleLogout = () => {
    setIsloggedIn(false);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsloggedIn(true);
    }
  }, []);



  return (
    <>
      <div>
        <Header />
        <video className="back_video" src={Video} autoPlay loop muted></video>
        <p className="vid_title">Audience <br></br> Optimization</p>
        <p className="vid_text">"Targeting the right audience ensures
          <br></br>that your advertising efforts are not wasted."</p>
        <div className="directions">
          <table>
            <tr>
              <td id="firstcell">
                <a id="ads" onClick={handleRedirectAd} href="create">Create Ads</a>
              </td>
              <td>
                <a id="results" onClick={handleRedirectAd} href="show">Show Results</a>
              </td>
              <td>
                <a id="plans" onClick={handleRedirectAd} href="res">AI Plan</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Section />
      <Section2 />
      <Section3 />
      <div className="customers">
        <div className="cust_title">
          <p className="titleSection">Our Customers</p>
        </div>
        <div className="shop_pics">
          <div className="row_imgs">
            <img className="shops_logos" src={image1} alt="pic" />
            <img className="shops_logos" src={image4} alt="pic" />
            <img className="shops_logos" src={image4} alt="pic" />
          </div>
          <div className="row_imgs">
            <img className="shops_logos" src={image3} alt="pic" />
            <img className="shops_logos" src={image5} alt="pic" />
            <img className="shops_logos" src={image2} alt="pic" />
          </div>
        </div>
      </div>
      <div className="feedback">
        <p className="feed_title">Feedback "</p>
        <div id="feed_slider">
          <Slideshow >
            <p class="slide active">Shop One Feedback</p>
            <p class="slide">Shop Two Feedback</p>
            <p class="slide">Shop Three Feedback</p>
          </Slideshow>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home