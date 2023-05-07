import React, { useState, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(""); //for test
  const [adsImage, setAdsImage] = useState("")
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [userReqTitle, setUserReqTitle] = useState("");
  const [userReqDesc, setUserRecDesc] = useState("");

  const [userResult, setUserResult] = useState([{
    "_id": "",
    "title": "",
    "gender": "",
    "age": "",
    "description": "",
    "status": "",
    "user": "",
    "timeReq": "",
    "image": "",
    "__v": 0
  },
  {
    "_id": "",
    "title": "",
    "gender": "",
    "age": "",
    "description": "",
    "status": "",
    "user": "",
    "timeReq": "",
    "image": "",
    "__v": 0
  }
  ]);



  const getUserAds = async (userId) => {
    try {
      const requests = await axios.get(`http://127.0.0.1:3000/ads/userads/${receiverId}`);
      const req_data = requests.data;
      setUserResult(req_data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleResult = async (e) => {
    e.preventDefault();
    await getUserAds(receiverId)
    console.log(userResult);
  }

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

  function handleImageUpload(e) {
    const file = e.target.files[0];
    setAdsImage(file);
  }

  const handleAnchorClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
    setActiveDiv(target);
    console.log("hello");
  };


  const getMessages = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/message/${receiverId}`);
      const admin_message = response.data;
      setAdminMessage(admin_message);
      // console.log(admin_message);
    } catch (error) {
      console.log(error);
    }
  };

  const createAd = async (e) => {

    const formData = new FormData();
    formData.append("title", userReqTitle);
    formData.append("description", userReqDesc);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("user", receiverId);
    formData.append('image', adsImage);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await axios.post("http://127.0.0.1:3000/ads/create", formData);
    console.log("ads created successfully");

  }

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
              <a onClick={handleAnchorClick} data-target="createAds">Create Ad</a>
              <a href="#" onClick={handleResult}>Active</a>
              <a href="#" onClick={() => handleResult("")}>Pending</a>
              <a href="#" onClick={() => handleResult("")}>Rejected</a>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {userResult && userResult.map((result) => (
                  <tr key={result._id}>
                    <td>{result.title}</td>
                    {/* <td><img src={require(`http://127.0.0.1:3000/uploads/${result.image}`)} alt="" /></td> */}
                    <td>{result.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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


          {activeDiv === "createAds" && <div id="createAds">
            <div className="createAdsBox">
              <p>Create Your Ad</p>
              <input type="text" id="userAd_title" placeholder="Enter title of your Ad"
                onChange={(e) => setUserReqTitle(e.target.value)} />
              <p>Select the Picture you want to Show</p>
              <div className="input_image">
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                />
                {adsImage == "" || adsImage == null ? "" : <img width={100} height={100} src={adsImage} />}
                <p>Description</p>
                <input type="text" placeholder="Enter the Description of your Ad" id="userAd_desc"
                  onChange={(e) => setUserRecDesc(e.target.value)} />
                <label>Targeted Gender:</label>
                <select id="user_gender" onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <label>Targeted Age:</label>
                <select id="user_age" onChange={(e) => setAge(e.target.value)}>
                  <option value="(4-12)">Kid (4-12)</option>
                  <option value="(12-53)">Adult (12-53)</option>
                </select>
                <button onClick={createAd}>Request</button>
              </div>
            </div>
          </div>}





        </div>
      </div>
    </div>
  );
}

export default User;