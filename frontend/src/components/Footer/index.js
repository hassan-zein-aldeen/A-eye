import './footer.css';


const Footer = () => {

  return (
    <div className="footer">
      <div className="info">
        <p className='hover'>Mobile app</p>
        <p className='hover'>Community</p>
        <p className='hover'>Company</p>
        <img  id="center_logo" />
        <p className='hover'>Help desk</p>
        <p className='hover'>Blog</p>
        <p className='hover'>Resources</p>
      </div>
      <div className="connect">
        <div className="icons">
          <img className="sm_icons" src={MyFace} alt="facebook.png" />
          <img className="sm_icons" src={MyIns} alt="instagram.png"></img>
          <img className="sm_icons" src={Mytwit} alt="twitter.png"></img>
          <img className="sm_icons" src={Mygit} alt="github.png"></img>
        </div>
        <div>
          <p className="slogan">&#9400;© A-Eye, Inc. 2023. We care about our users!</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;