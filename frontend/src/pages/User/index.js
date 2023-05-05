import React, { useState } from "react";
import "./user.css";
import Userbar from "../../components/Userbar";


const User = () => {
  const [activeDiv, setActiveDiv] = useState('')

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



          {/*Start of Ads div */}
          {activeDiv === "ads" && <div id="ads">
            Hello from Creating ads
          </div>}
          {/*End of Ads div */}




          {/*Start of requesting ads div */}
          {activeDiv === "user_requests" && <div id="user_requests" >
            Hello from requesting add
          </div>}
          {/*End of requesting ads div */}



          {/*Start of messages div */}
          {activeDiv === "user_messages" && <div id="user_messages">
            Hello from messages of user
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