import './message.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Button1 from '../Button1/Button';
import messIcon from "../../images/sent1.svg";

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
  const [message_receiver, setMessage_receiver] = useState('');
  const [senderInputValue, setSenderInputValue] = useState('');
  const [shopnameIds, setShopnamesIds] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [selectedShops, setSelectedShops] = useState([]);


  const title_name = localStorage.getItem("shopname");

  const senderId = localStorage.getItem('id').toString();

  useEffect(() => {
    const delay = 1000;
    let timeoutId;

    const searchUsers = async () => {
      const response = await axios.get("http://127.0.0.1:3000/user/");
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
    console.log(checkedBoxes);
    setIsOpenFilter(false);

  }


  const handleClick = async (event) => {
    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    setActiveDiv(target);
    setActiveLink(event.target.hash);
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
    try {
      const sent = await axios.get(`http://127.0.0.1:3000/message/sentMessages/${senderId}`);
      const sent_messages = sent.data;
      setSent_messages(sent_messages);
      console.log(sent_messages)
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


  const sendMessage = async (e) => {
    e.preventDefault();

    const mess_data = {
      "rec": [message_receiver],
      "sender": senderId,
      "title": message_title,
      "txtContent": message_content
    }

    try {
      const send = await axios.post("http://127.0.0.1:3000/message/", mess_data);
      console.log("sent Successfully");
    } catch (e) {
      console.log(e);
    }
  }

  function handleCheckboxChange(shopId) {
    if (checkedBoxes.includes(shopId)) {
      setCheckedBoxes(checkedBoxes.filter(id => id !== shopId));
      setSelectedShops(selectedShops.filter(shop => shop._id !== shopId));
      console.log(checkedBoxes);
    } else {
      setCheckedBoxes([...checkedBoxes, shopId]);
      const selectedShop = shopnameIds.find(shop => shop._id === shopId);
      setSelectedShops([...selectedShops, selectedShop]);
      console.log(checkedBoxes);
    }
  }

  function isChecked(shopId) {
    return checkedBoxes.includes(shopId);
  }


  return (
    <div>
      <div className='right_div'>
        <p className="shopname-title">Shopname: <span> {title_name}</span></p>
        <div className='header_title'>

          <div className='linking'>
            <a href='#' onClick={handleClick} data-target='old_messages' id='history'>History</a>
          </div>
          <a href='#' onClick={handleClick} data-target='mess_content' id='message'>Send Message</a>
        </div>
        {activeDiv === "old_messages" && <div id="old_messages">
          <table className="messages_table">
            <thead>
              <tr className='col_titles'>
                <tr></tr>
                <th>Date and Time</th>
                <th>Shop Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {sent_messages && sent_messages.map(da_ti => (
                <tr key={da_ti._id}>
                  <td className='key'><img id='sentIcon' src={messIcon}/></td>
                  <td className="key" style={{ width: "20rem" }}> {da_ti.timeSent.slice(0, 10)} <br /> {da_ti.timeSent.slice(11, 19)}</td>
                  <td className='key'>{da_ti.receiver.map((receiver, index) => (<span key={receiver._id}>{receiver.shopname}</span>))}</td>
                  <td className="key" > {da_ti.title}</td>
                  <td id='last_col'><Button1 onClick={() => handleOpen(da_ti._id)} disabled={isViewMess}>Read</Button1></td>
                </tr>
              )).reverse()}
            </tbody>
          </table>
          {isBoxOpen && (<div className={`boxMessage ${isBoxOpen ? "show" : ""}`}>
            <p>{selectedMessage.txtContent}</p>
            <Button1 onClick={handleClose}>Close</Button1>
          </div>)}
        </div>}
        {activeDiv === "mess_content" &&
          <div className='mess_content'>
            <div className='message_header'>
              <div className='mess_labels'>
                <label>Shop Name (s):</label>
                <label>Title:</label>
                <label>Text:</label>
              </div>
              <div className='mess_inputs'>
                <div>
                  {selectedShops.map((shop, index) => (
                    <div key={index} className='selected_shop'>{shop.shopname}<span className='remove_shop' onClick={() => {
                      const shopId = shop._id;
                      setCheckedBoxes(checkedBoxes.filter(id => id !== shopId));
                      setSelectedShops(selectedShops.filter(shop => shop._id !== shopId));
                    }}></span></div>
                  ))}
                </div>
                <input id='shopname_input' type='text' placeholder='Enter Shop(s) Name' onChange={handleInputChange} />
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
                  <Button1 onClick={handleFilterClose}>Close</Button1>
                </div>)}
                <input id='title_input' type='text' placeholder='Enter message Title' onChange={(e) => setMessage_title(e.target.value)} />
              </div>
            </div>
            <div className='message_box'>
              <textarea id='text_input' placeholder='Insert Your Message' onChange={(e) => setMessage_content(e.target.value)} />
            </div>
            <div className='send_but'>
              <Button1 onClick={sendMessage}>Send</Button1>
            </div>
          </div>}
      </div>


    </div>

  )
}

export default Message;


