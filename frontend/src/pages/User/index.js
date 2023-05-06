import React, { useState } from "react";
import "./user.css";
import Userbar from "../../components/Userbar";
import Button1 from "../../components/Button1/Button";
import axios from "axios";
import messIcon from "../../images/sent1.svg";


const User = () => {
  const [activeDiv, setActiveDiv] = useState("");
  const [adminMessage, setAdminMessage] = useState([]);
  const userShopNameTitle = localStorage.getItem("shopname");
  const receiverId = localStorage.getItem("id").toString();
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [isViewMess, setIsViewMess] = useState(false);

  const getMessages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/message/${receiverId}`);
      const admin_message = response.data;
      setAdminMessage(admin_message);
      console.log(admin_message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (id) => {
    setSelectedMessage(adminMessage.find((message) => message._id === id));
    console.log("hello 2");
    setIsBoxOpen(true);
    setIsViewMess(true);
  };

  const handleClose = () => {
    setIsBoxOpen(false);
    setIsViewMess(false);
  };

  const handleAnchorClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
    setActiveDiv(target);
    console.log("hello");
  };



  return (
    <div>
      <div className="all_page">
        <div className="userbar">
          <Userbar handleAnchorClick={handleAnchorClick} />
        </div>
        <div className="content">
          <p className="userTitleShopName">Shopname: <span>{userShopNameTitle}</span></p>


          {/*Start of requesting ads div */}
          {activeDiv === "user_adver" && <div id="user_adver" >
            <div className="ads_title">
              <a href="#" onClick={handleAnchorClick} data-target="active_ads">Active</a>
              <a href="#" onClick={handleAnchorClick} data-target="inActive_ads">Pending</a>
              <a href="#" onClick={handleAnchorClick} data-target="rejected_ads">Rejected</a>
              {activeDiv === "active_ads" && (<div id="active_ads" style={{ color: "black" }}>
                here are active ads
              </div>)}
            </div>

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
              <div className="titlediv">
                <a href="#" className="message_title" onClick={getMessages}>
                  Show Messages
                </a>
              </div>
              <div className="user_message">
                <table className="usermess_table">
                  <tbody>
                    <tr>
                      <th></th>
                      <th>Date And Time</th>
                      <th>Title</th>
                    </tr>
                    {adminMessage.map(adminMess => (
                      <tr key={adminMess._id}>
                        <td className="iconCell"> <img className="message_icon" src={messIcon} /></td>
                        <td>
                          {adminMess.timeSent.slice(0, 10)}
                          <br />
                          {adminMess.timeSent.slice(11, 19)}
                        </td>
                        <td>{adminMess.title}</td>
                        <td><Button1 onClick={() => handleOpen(adminMess._id)} disabled={isViewMess}>Read</Button1></td>
                      </tr>
                    ))}
                    {isBoxOpen && (<div className={`boxMessage ${isBoxOpen ? "show" : ""}`}>
                      <p>{selectedMessage.txtContent}</p>
                      <Button1 onClick={handleClose}>Close</Button1>
                    </div>)}
                  </tbody>
                </table>
              </div>
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