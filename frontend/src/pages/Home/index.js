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


const Home = () => {


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
                <a id="ads" href="http://localhost:3000/">Add Ads</a>
              </td>
              <td>
                <a id="offers" href="http://localhost:3000/">Add Offers</a>
              </td>
              <td>
                <a id="results" href="http://localhost:3000/">Show Results</a>
              </td>
              <td>
                <a id="plans" href="http://localhost:3000/">AI Plan</a>
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
          <p>Our Customers</p>
        </div>
        <div className="shop_pics">
          <div className="row_imgs">
            <img src={image1} alt="pic" />
            <img src={image4} alt="pic" />
            <img src={image4} alt="pic" />
          </div>
          <div className="row_imgs">
            <img src={image3} alt="pic" />
            <img src={image5} alt="pic" />
            <img src={image2} alt="pic" />
          </div>
        </div>
      </div>
      <div className="feedback">
        <p className="feed_title">Feedback "</p>
        <div id="feed_slider">
          <Slideshow >
            <p class="slide active">First feedback 1</p>
            <p class="slide">Second feedback  2</p>
            <p class="slide">Third feedback 3</p>
          </Slideshow>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home