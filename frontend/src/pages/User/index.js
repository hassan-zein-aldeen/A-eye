import React, { useState, useEffect } from "react";
import "./user.css";
import Button1 from "../../components/Button1/Button";
import axios from "axios";
import messIcon from "../../images/sent1.svg";
import user_logo from "../../images/EditedLogo.svg";
import Button2 from "../../components/Button2";
import { ReactDOM } from "react";



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
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("(4-12)");
  const [userReqTitle, setUserReqTitle] = useState("");
  const [userReqDesc, setUserRecDesc] = useState("");

  const [pendingResults, setPendingResults] = useState("");
  const [activeResults, setActiveResults] = useState("");
  const [inActiveResults, setinActiveResults] = useState("");
  const [res_message, setRes_message] = useState("");
  const [rejectedResults, setRejectedResults] = useState("");
  const userStatus = localStorage.getItem("status");

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

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try {
      const requests = await axios.get(`http://127.0.0.1:3000/ads/userads/${userId}`, config);
      const req_data = requests.data;
      console.log(req_data);
      setUserResult(req_data);
      console.log("here is the user result of get ads", userResult);
      const pend = userResult.filter(result => result.status === 'pending');
      setPendingResults(pend);
      const active = userResult.filter(result => result.status === 'active');
      setActiveResults(active);
      const inActive = userResult.filter(result => result.status === 'inactive');
      setinActiveResults(inActive);
      const rejected = userResult.filter(result => result.status === 'rejected');
      setRejectedResults(rejected);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    const fetchData = async () => {
      try {
        const adsResult = await getUserAds(receiverId);
        setResult(adsResult);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  console.log('results from useEffect', userResult);


  const getMessages = async (e) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try {
      const response = await axios.get(`http://127.0.0.1:3000/message/${receiverId}`, config);
      const admin_message = response.data;
      setAdminMessage(admin_message);
      handleAnchorClick(e);
    } catch (error) {
      console.log(error);
    }
  };

  const createAd = async (e) => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    if (!userReqTitle || !userReqDesc || !gender || !age || !receiverId || !adsImage) {
      setRes_message("Please fill all the form!");
    }

    else {
      setRes_message("Your Ad is Successfully requested to Admin");
    }
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

    const response = await axios.post("http://127.0.0.1:3000/ads/create", formData, config);
    console.log(response.data.message);
    window.location.reload();
  }

  const deactivateAd = async (adId) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try {
      const deactivatedAd = await axios.put(`http://127.0.0.1:3000/ads/deactivate/${adId}`, config);
      setRes_message("see here");
      console.log(res_message);
      console.log("this is deactivated");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const requestInActiveAd = async (adId) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    try {
      const canceledAd = await axios.put(`http://127.0.0.1:3000/ads/request/${adId}`, config);
      setRes_message("InActive Ad requested Successfully");
      console.log(res_message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleResult = async (e) => {
    e.preventDefault();
    await getUserAds(receiverId)
    console.log("this is user result", userResult);
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
  };


  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('status');
    localStorage.removeItem('username');
    localStorage.removeItem('shopname');
    localStorage.removeItem('role');
    window.location.href = 'http://localhost:3001/login';
  }


  return (
    <div>
      <div className="all_page">
        <div>
        </div> {/* for testng child comp */}
        <div className="content">
          <div className="userHeader">
            <a href="http://127.0.0.1:3001/Home">
              <img
                id="user_logopage"
                style={{ width: "8rem" }}
                src={user_logo}
                alt="user Logo"
              />
            </a>
            <div className="userheader_links">
              <a onClick={(e) => {
                getUserAds(receiverId);
                handleAnchorClick(e);
              }} data-target="newDiv">My Ads</a>
              <a onClick={(event) => getMessages(event)} data-target="user_messages">Messages</a>
              <a onClick={logout}>Logout</a>
            </div>
          </div>
          <div className="content_header">
            <p className="title_userSection">My Ads</p>
            <Button1 onClick={(e) => handleAnchorClick(e)}
              className="New_User" data-target="createTheAd">
              <button data-target="createTheAd" id="children_button">Create Ad</button></Button1>
          </div>
          <div className="directional_links">
            <a href="#" onClick={(e) => {
              handleAnchorClick(e);
              getUserAds(receiverId);
            }} data-target="show_active">Active</a>
            <a href="#" onClick={(e) => {
              getUserAds(receiverId);
              handleAnchorClick(e);
            }} data-target="show_pending" >Pending</a>
            <a href="#" onClick={(e) => {
              handleAnchorClick(e);
              getUserAds(receiverId);
            }} data-target="show_inActive">Archive</a>
            <a href="#" onClick={(e) => {
              handleAnchorClick(e);
              getUserAds(receiverId);
            }} data-target="show_rejected">Rejected</a>
          </div>
          <div className="contentControle">
            {userResult && userResult.map((result) => (
              <div key={result._id} className="shownResultCard">
                <div className="respActiveCard">
                  <img src={`http://127.0.0.1:3000/${result.image}`} alt="" />
                  <div className="respActiveCard_text">
                    <p>{result.title}</p>
                    <td>{result.description}</td>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {activeDiv === "newDiv" && <div id="newDive"> {/**flag 1 */}
            {userResult && userResult.map((result) => (
              <div key={result._id} className="shownResultCard">
                <div className="respActiveCard">
                  <img src={`http://127.0.0.1:3000/${result.image}`} alt="" />
                  <div className="respActiveCard_text">
                    <p>{result.title}</p>
                    <td>{result.description}</td>
                    <Button2 onClick={() => deactivateAd(result._id)}>Deactivate</Button2>
                  </div>
                </div>
              </div>
            ))}
          </div>}

          {/*Start of requesting ads div */}
          {/* {activeDiv === "user_adver" && <div id="user_adver" >
            <div className="ads_title">
              <a onClick={handleAnchorClick} disabled={"inactive" ? true : false} data-target="createAds" id="create_newAdd">Create Ad</a>

              <a href="#" onClick={(e) => {
                handleAnchorClick(e);
                getUserAds(receiverId);
              }} data-target="show_active">Active</a>

              <a href="#" onClick={(e) => {
                handleAnchorClick(e);
                getUserAds(receiverId);
              }} data-target="show_pending">Pending</a>

              <a href="#" onClick={(e) => {
                handleAnchorClick(e);
                getUserAds(receiverId);
              }} data-target="show_inActive">InActive</a>

              <a href="#" onClick={(e) => {
                handleAnchorClick(e);
                getUserAds(receiverId);
              }} data-target="show_rejected">Rejected</a>
            </div>
          </div>} */}
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
                <p href="#" className="message_title">
                  Messages
                </p>
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



          {activeDiv === "show_active" && <div id="show_active">

            {activeResults && activeResults.map((result) => (
              <div key={result._id} className="shownResultCard">
                <div className="respActiveCard">
                  <img src={`http://127.0.0.1:3000/${result.image}`} alt="" />
                  <div className="respActiveCard_text">
                    <p>{result.title}</p>
                    <td>{result.description}</td>
                    <Button2 onClick={() => deactivateAd(result._id)}>Deactivate</Button2>
                  </div>
                </div>
              </div>
            ))}
          </div>}


          {activeDiv === "show_pending" && <div id="show_pending">
            {pendingResults && pendingResults.map((result) => (
              <div key={result._id} className="shownResultCard">
                <div className="respActiveCard">
                  <img src={`http://127.0.0.1:3000/${result.image}`} alt="" />
                  <div className="respActiveCard_text">
                    <p>{result.title}</p>
                    <td>{result.description}</td>
                    <Button2 onClick={() => deactivateAd(result._id)}>Delete Request</Button2>
                  </div>
                </div>
              </div>
            ))}
          </div>}


          {activeDiv === "show_inActive" && <div id="show_inActive">
            {inActiveResults && inActiveResults.map((result) => (
              <div key={result._id} className="shownResultCard">
                <div className="respActiveCard">
                  <img src={`http://127.0.0.1:3000/${result.image}`} alt="" />
                  <div className="respActiveCard_text">
                    <p>{result.title}</p>
                    <td>{result.description}</td>
                    <Button2 onClick={() => requestInActiveAd(result._id)}>Request</Button2>
                  </div>
                </div>
              </div>
            ))}
          </div>}

          {activeDiv === "show_rejected" && <div id="show_rejected">
            {rejectedResults && rejectedResults.map((result) => (
              <div key={result._id} className="shownResultCard">
                <div className="respActiveCard">
                  <img src={`http://127.0.0.1:3000/${result.image}`} alt="" />
                  <div className="respActiveCard_text">
                    <p>{result.title}</p>
                    <td>{result.description}</td>
                  </div>
                </div>
              </div>
            ))}
          </div>}
          {activeDiv === "createTheAd" && <div id="createTheAd">
            <div className="createAdsBox">
              <p className="createBoxTitle">Create Your Ad</p>
              <div className="oneinput">
                <label>Title</label>
                <input type="text" id="userAd_title" placeholder="Enter your title here"
                  onChange={(e) => setUserReqTitle(e.target.value)} />
              </div>
              <div className="twoinput" >
                <label>Description</label>
                <input type="text" placeholder="Here goes your Ads Description" id="userAd_desc"
                  onChange={(e) => setUserRecDesc(e.target.value)} />
              </div>
              <div className="threeinput">
                <label>Targeted Gender:</label>
                <select id="user_gender" onChange={(e) => setGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <label>Targeted Age:</label>
                <select id="user_age" onChange={(e) => setAge(e.target.value)}>
                  <option value="(4-12)">Kids</option>
                  <option value="(12-53)">Adults</option>
                </select>
              </div>
              <div className="threeinput">
                <label>Select the Picture you want to Show</label>
                <div className="input_image">
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="buttonDivs">
                  <button id="requesttheAd" onClick={handleAnchorClick}>Cancel</button>
                  <button id="requesttheAdn" onClick={createAd}>Request</button>
                </div>
                <p style={{ color: "blue" }}>{res_message}</p>
              </div>
            </div>
          </div>}
        </div>

      </div>
    </div >
  );
}

export default User;




