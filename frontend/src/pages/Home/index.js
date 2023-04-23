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
      </div>
    </>
  );
}

export default Home