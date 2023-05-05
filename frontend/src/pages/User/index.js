import React, { useState } from "react";
import "./user.css";
import Userbar from "../../components/Userbar";


const User = () => {
  const [activeDiv, setActiveDiv] = useState('');
  const userShopNameTitle = localStorage.getItem("shopname");

  const handleAnchorClick = (e, target) => {
    e.preventDefault();
    setActiveDiv(target);
  };

  

  return (
    <div>
      <div className="all_page">
        <div className="userbar">
          <Userbar handleAnchorClick={handleAnchorClick} />
        </div>
        <div className="content">
          <p className="userTitleShopName">Shopname:<span>{userShopNameTitle}</span></p>


          {/*Start of requesting ads div */}
          {activeDiv === "user_adver" && <div id="user_adver" >
            Hello from creating ads
          </div>}
          {/*End of requesting ads div */}




          {/*Start of requesting ads div */}
          {activeDiv === "user_requests" && <div id="user_requests" >
            Hello from requesting add
          </div>}
          {/*End of requesting ads div */}



          {/*Start of messages div */}
          {activeDiv === "user_messages" && <div id="user_messages">
            <div className="messages">
              <p className="section_title">
                All Messages
              </p>
            </div>
          </div>}
          {/*End of messages div */}




          {/*Start of AI tools div */}
          {activeDiv === "ai_tool" && <div id="ai_tool">
            Hello from AI tools of user
          </div>}
          {/*End of of AI tools div */}



        </div>
      </div>
    </div>
  );
}

export default User;