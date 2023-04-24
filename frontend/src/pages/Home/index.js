import Header from "../../components/Header/header";
import Video from "../../video/high.mp4";
import TextContent from "../../components/TextContent";

import './home.css';

const Home = () => {

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
      <div>
        <Header />
        <video className="back_video" src={Video} autoPlay loop muted></video>
        <p className="vid_title">Audience <br></br> Optimization</p>
        <p className="vid_text">"Targeting the right audience ensures <br></br>that your advertising efforts are not wasted."</p>
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
    </>
  );
}

export default Home