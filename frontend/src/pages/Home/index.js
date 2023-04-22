import Header from "../../components/Header/header";
import Video from "../../video/high.mp4";
import './home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <video className="back_video" src={Video} autoPlay loop muted></video>
    </div>
  );
}

export default Home