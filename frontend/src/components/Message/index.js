import './message.css';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import Button1 from '../Button1/Button';
import messIcon from "../../images/sent1.svg";
import Button2 from '../Button2';
import Button3 from '../Button3';



const Message = () => {

  const [activeDiv, setActiveDiv] = useState('old_messages');
  const [actveLink, setActiveLink] = useState('');
  const [sent_messages, setSent_messages] = useState('')
  const [date_time, setDate_time] = useState('');
  const [shopnames, setShopnames] = useState('');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [isViewMess, setIsviemess] = useState(false);
  const [message_title, setMessage_title] = useState('')
  const [message_content, setMessage_content] = useState('');
  const [senderInputValue, setSenderInputValue] = useState('');
  const [shopnameIds, setShopnamesIds] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [sentSucceed, setSentSucceed] = useState('');


  //last step of testing
  {/*Now testing new one */ }
  {/*Now testing new two */ }

  const title_name = localStorage.getItem("shopname");
  const senderId = localStorage.getItem('id').toString();

  useEffect(() => {
    const delay = 1000;
    let timeoutId;

    const searchUsers = async () => {

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      }

      const response = await axios.get("http://127.0.0.1:3000/user/", config);
      const filteredUsers = response.data;
      setShopnamesIds(filteredUsers);
      console.log(shopnameIds);
    };

    const debounceSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(searchUsers, delay);
    };
    debounceSearch();

    return () => clearTimeout(timeoutId);
  }, [senderInputValue]);

  const handleInputChange = (event) => {
    event.preventDefault();
    setSenderInputValue(event.target.value);
    setIsOpenFilter(true);
  };

  const handleFilterClose = () => {
    console.log("from handle filter close", checkedBoxes);
    setIsOpenFilter(false);
  }



  const handleClick = async (event) => {
    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    setActiveDiv(target);
    setActiveLink(event.target.hash);
    setButtonVisible(false);
    await getSentMessages(senderId);
  }

  const handleOpen = (id) => {
    setSelectedMessage(sent_messages.find(message => message._id === id));
    setIsBoxOpen(true);
    setIsviemess(true);
  };

  useEffect(() => {
  }, [selectedMessage]);

  const handleClose = () => {
    setIsBoxOpen(false);
    setIsviemess(false);
  }


  const getSentMessages = async (senderId) => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const sent = await axios.get(`http://127.0.0.1:3000/message/sentMessages/${senderId}`, config);
      const sent_messages = sent.data;
      setSent_messages(sent_messages);
      const date_time = sent_messages.map((message) => message.timeSent);
      setDate_time(date_time);
      const shopnames = sent_messages.map((message) => message.receiver.map
        ((receiver) => {
          const { shopname } = receiver;
          return { shopname };
        })
      );
      setShopnames(shopnames);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSentMessages(senderId);
  }, []);

  function handleCheckboxChange(shopId) {
    if (checkedBoxes.includes(shopId)) {
      setCheckedBoxes(checkedBoxes.filter(id => id !== shopId));
      setSelectedShops(selectedShops.filter(shop => shop._id !== shopId));
    } else {
      setCheckedBoxes([...checkedBoxes, shopId]);
      const selectedShop = shopnameIds.find(shop => shop._id === shopId);
      setSelectedShops([...selectedShops, selectedShop]);
    }
  }

  useEffect(() => {
  }, [checkedBoxes]);


  const sendMessage = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    let errorMessage = '';

    if (checkedBoxes.length === 0) {
      errorMessage = "Missing shop names!";
    } else if (!message_title) {
      errorMessage = "Please enter a title for your message";
    } else if (!message_content) {
      errorMessage = "Please enter text for your message";
    }

    setErrorMessage(errorMessage);

    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    const mess_data = {
      "rec": checkedBoxes,
      "sender": senderId,
      "title": message_title,
      "txtContent": message_content
    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }

    try {
      const send = await axios.post("http://127.0.0.1:3000/message/", mess_data, config);
      setSentSucceed('Your Message sent successfully!');

      setTimeout(() => {
        setActiveDiv('old_messages');
      }, 2000);

    } catch (e) {
      console.log(e);
    }
  }



  function isChecked(shopId) {
    return checkedBoxes.includes(shopId);
  }


  return (
    <div>
      <div className='right_div'>
        <div className='header_title'>
          <p className='titlesectionAds'>Messages</p>
          {buttonVisible && (<button href='#' onClick={handleClick}
            data-target='mess_content' id='message'>New Message</button>)}
        </div>
        <div id="old_messages" className={`background-div ${activeDiv === "mess_content" ? "active" : ""} ${activeDiv === "mess_content" ? "old_messages" : ""}`}>
          <table className="messages_table">
            <thead>
              <tr className='col_titles'>
                <tr></tr>
                <th>Date and Time</th>
                <th>Shop Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {sent_messages && sent_messages.map(da_ti => (
                <tr key={da_ti._id}>
                  <td className='key'><img id='sentIcon' src={messIcon} /></td>
                  <td className="key" style={{ width: "20rem" }}> {da_ti.timeSent.slice(0, 10)} <br /> {da_ti.timeSent.slice(11, 19)}</td>
                  <td className='key'>
                    {da_ti.receiver.map((receiver, index) =>
                    (<span key={receiver._id}> &bull; {receiver.shopname}
                      {index !== da_ti.receiver.length - 1 && <br />}
                    </span>))}</td>
                  <td className="key" > {da_ti.title}</td>
                  <td id='last_col'><a onClick={() => handleOpen(da_ti._id)} disabled={isViewMess}>Read</a></td>
                </tr>
              )).reverse()}
            </tbody>
          </table>
          {isBoxOpen && (<div className={`boxMessage ${isBoxOpen ? "show" : ""}`}>
            <p>{selectedMessage.txtContent}</p>
            <Button1 onClick={handleClose}>Close</Button1>
          </div>)}
        </div>
        {activeDiv === "mess_content" &&
          <div className='mess_content'>
            <div className='message_header'>
              <div className='mess_labels'>
                <label>Shop Name (s):</label>
                <label>Title:</label>
                <label>Text:</label>
              </div>
              <div className='newMessageInputs'>
                <input id='shopname_input' type='text' placeholder='Search for shop names' onChange={handleInputChange} autoComplete="off" />
                <input id='title_input' type='text' placeholder='Enter message Title'
                  onChange={(e) => setMessage_title(e.target.value)} autoComplete="off" />
              </div>
              <div className='mess_inputs'>
                <div className='contacts'>
                  {selectedShops.map((shop, index) => (
                    <div key={index} className='selected_shop'>{shop.shopname}<span className='remove_shop' onClick={() => {
                      const shopId = shop._id;
                      setCheckedBoxes(checkedBoxes.filter(id => id !== shopId));
                      setSelectedShops(selectedShops.filter(shop => shop._id !== shopId));
                    }}></span></div>
                  ))}
                </div>
                {isOpenFilter && (<div className={`filter_box ${isOpenFilter ? "show" : ""}`}>
                  <ul className='key'>
                    {shopnameIds
                      .filter(shop => shop.shopname.includes(senderInputValue))
                      .map((shop, index) => (
                        <div className='rowsend' key={index}>
                          <input
                            className='checksend'
                            style={{ width: "1rem" }}
                            type='checkbox'
                            checked={isChecked(shop._id)}
                            onChange={() => handleCheckboxChange(shop._id)}
                          />
                          {shop.shopname}
                        </div>
                      ))
                    }
                  </ul>
                  <button id='closeList' onClick={handleFilterClose}>Close</button>
                </div>)}
              </div>
            </div>
            <div className='message_box'>
              <textarea id='text_input' placeholder='Insert Your Message' onChange={(e) => setMessage_content(e.target.value)} />
            </div>
            <div className='send_but'>
              <Button2 onClick={() => {
                setActiveDiv("old_messages");
                setButtonVisible(true);
                setSelectedShops([]);
                setCheckedBoxes([]);
                setSentSucceed('');
              }}>Close</Button2>
              <Button3 onClick={sendMessage}>Send</Button3>
            </div>
            <div id='responseError'>{errorMessage}</div>
            <div id='Succeed'>{sentSucceed}</div>
          </div>}
      </div>
    </div>

  )
}

export default Message;


