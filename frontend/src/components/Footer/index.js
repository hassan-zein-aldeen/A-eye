import logo_image from "../../images/footerlogo.svg";
import facebook from "../../icons/facebook.svg";
import instagram from "../../icons/insta.svg";
import twitter from "../../icons/twit.svg";
import email from "../../icons/email.svg";
import whatsapp from "../../icons/whatsa.svg";

import './footer.css';


const Footer = () => {

  return (
    <div className="footer">
      <div className="footer_info">
        <p className='hover'>Mobile app</p>
        <p className='hover'>Community</p>
        <p className='hover'>Company</p>
        <img  id="center_logo" src={logo_image} alt="footerlogo"/>
        <p className='hover'>Help desk</p>
        <p className='hover'>Blog</p>
        <p className='hover'>Resources</p>
      </div>
      <div className="connect">
        <div className="footer_icons">
          <img className="sm_icons" src={facebook} alt="facebook.svg" />
          <img className="sm_icons" src={instagram} alt="instagram.svg" />
          <img className="sm_icons" src={email} alt="email.svg" />
          <img className="sm_icons" src={twitter} alt="twitter.svg" />
          <img className="sm_icons" src={whatsapp} alt="whatsapp.svg" />
        </div>
        <div>
          <p className="slogan">&#9400; A-Eye, Inc. 2023. We care about our users!</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;