import React, { useState, useEffect } from "react";
import "./user.css";
import Button1 from "../../components/Button1/Button";
import axios, { isAxiosError } from "axios";
import messIcon from "../../images/sent1.svg";
import user_logo from "../../images/EditedLogo.svg";
import Button2 from "../../components/Button2";
import { ReactDOM } from "react";
import Button3 from "../../components/Button3";



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
  const [isActive, setIsActive] = useState(true);
  const { isActiveAds, setIsActiveAds } = useState(true);

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
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);


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

    if (!userReqTitle) {
      setErrorMessage("Missing Ad Title!");
      return;
    }

    if (!userReqDesc) {
      setErrorMessage("Missing Ad description!");
      return
    }

    if (!gender) {
      setErrorMessage("Missing Gender to be targeted!");
      return
    }

    if (!age) {
      setErrorMessage("Missing Age to be targeted!");
      return
    }

    if (!adsImage) {
      setErrorMessage("Missing Image!");
      return
    }

    if(userStatus === "inactive"){
      setErrorMessage("You are deactivated");
      return
    }

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
    console.log(localStorage.getItem("token"));
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const deactivatedAd = await axios.put(`http://127.0.0.1:3000/ads/deactivate/${adId}`,{}, config);
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
      const canceledAd = await axios.put(`http://127.0.0.1:3000/ads/request/${adId}`,{}, config);
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
    setIsActive(false);
  };

  const handleMyAdsClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
    setActiveDiv(target);
    setIsActive(true);
  }

  const handleMyMessageClick = (e) => {
    e.preventDefault();
    const target = e.target.getAttribute("data-target");
    setActiveDiv(target);
    setIsActive(false);
  }


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
                handleMyAdsClick(e);
              }} data-target="isActive">My Ads</a>
              <a onClick={(event) => getMessages(event)} data-target="user_messages">Messages</a>
              <a onClick={logout}>Logout</a>
            </div>
          </div>
          {activeDiv != "user_messages" &&
            <div> {/*flag 2 */}
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
              {isActive && <div className="isActive">
                <div className="contentControle">
                  {userResult.map((result) => (
                    <div key={result._id} className="shownResultCard">
                      <div className="respActiveCard">
                        <div className="imageSection" style={{
                          backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                        }}>
                        </div>
                        <div className="respActiveCard_text">
                          <h4>{result.title}</h4>
                          <p>{result.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}
            </div>
          }



          {/*Start of requesting ads div */}
          {activeDiv === "user_requests" && <div id="user_requests" >
            Hello from requesting add
          </div>}
          {/*End of requesting ads div */}



          {/*Start of messages div */}
          {activeDiv === "user_messages" &&
            <div id="user_messages">
              <div className="content_header content_headerMessage">
                <p className="title_userSection title_userSectionMessages">Messages</p>
              </div>
              <div className="contentControle">
                <table className="usermess_table">
                  <tbody>
                    <tr>
                      <th className="iconCell"></th>
                      <th className="date">Date And Time</th>
                      <th className="message">Title</th>
                      <th className="button"></th>
                    </tr>
                    {adminMessage.map(adminMess => (
                      <tr key={adminMess._id}>
                        <td className="iconCell"> <img className="message_icon" src={messIcon} /></td>
                        <td className="date">
                          {adminMess.timeSent.slice(0, 10)}&nbsp;{adminMess.timeSent.slice(11, 19)}
                        </td>
                        <td className="message">{adminMess.title}</td>
                        <td className="button"><Button1 onClick={() => handleOpen(adminMess._id)} disabled={isViewMess}>Read</Button1></td>
                      </tr>
                    ))}
                    {isBoxOpen && (<div className={`boxMessage ${isBoxOpen ? "show" : ""}`}>
                      <p>{selectedMessage.txtContent}</p>
                      <Button1 onClick={handleClose}>Close</Button1>
                    </div>)}
                  </tbody>
                </table>
              </div>

            </div>}
          {/*End of messages div */}


          {/*Start of AI tools div */}
          {activeDiv === "ai_tool" && <div id="ai_tool">
            Hello from AI tools of user
          </div>}
          {/*End of of AI tools div */}



          {activeDiv === "show_active" && <div id="show_active">
            <div className="contentControle">
              {activeResults && activeResults.map((result) => (
                <div key={result._id} className="shownResultCard">
                  <div className="respActiveCard">
                    <div className="imageSection" style={{
                      backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                    }}>
                    </div>
                    <div className="respActiveCard_text">
                      <h4>{result.title}</h4>
                      <p>{result.description}</p>
                      <Button2 onClick={() => deactivateAd(result._id)}>Deactivate</Button2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}


          {activeDiv === "show_pending" && <div id="show_pending">
            <div className="contentControle">
              {pendingResults && pendingResults.map((result) => (
                <div key={result._id} className="shownResultCard">
                  <div className="respActiveCard">
                    <div className="imageSection" style={{
                      backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                    }}>
                    </div>
                    <div className="respActiveCard_text">
                      <h4>{result.title}</h4>
                      <p>{result.description}</p>
                      <Button2 className="elements" id="pendBut" onClick={() => deactivateAd(result._id)}>Delete Request</Button2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}


          {activeDiv === "show_inActive" && <div id="show_inActive">
            <div className="contentControle">
              {inActiveResults && inActiveResults.map((result) => (
                <div key={result._id} className="shownResultCard">
                  <div className="respActiveCard">
                    <div className="imageSection" style={{
                      backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                    }}>
                    </div>
                    <div className="respActiveCard_text">
                      <h4>{result.title}</h4>
                      <p>{result.description}</p>
                      <Button3 onClick={() => requestInActiveAd(result._id)}>Request</Button3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}


          {activeDiv === "show_rejected" && <div id="show_rejected">
            <div className="contentControle">
              {rejectedResults && rejectedResults.map((result) => (
                <div key={result._id} className="shownResultCard">
                  <div className="respActiveCard">
                    <div className="imageSection" style={{
                      backgroundImage: `url(http://127.0.0.1:3000/uploads/${result.image})`
                    }}>
                    </div>
                    <div className="respActiveCard_text">
                      <h4>{result.title}</h4>
                      <p>{result.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  <button id="requesttheAd"
                    onClick={handleAnchorClick}>Cancel</button>
                  <button id="requesttheAdn" onClick={createAd}>Request</button>
                </div>
                <p style={{ marginBottom: "1rem", textAlign: "center", color: "#F2441D" }}>{errorMessage}</p>
              </div>
            </div>
          </div>}
        </div>

      </div>
    </div >
  );
}

export default User;




