import Header from "../../components/Header/header";
import Video from "../../video/high.mp4";

import './home.css';

const Home = () => {
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