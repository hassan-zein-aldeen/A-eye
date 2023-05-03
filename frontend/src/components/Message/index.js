import './message.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import Button1 from '../Button1/Button';

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

  const senderId = localStorage.getItem('id').toString();

  useEffect(() => {
    const delay = 500;
    let timeoutId;

    const searchUsers = async () => {
      const response = await axios.get("http://127.0.0.1:3000/user/");
      const data = response.data;
      const filteredUsers = data.map(user => user.shopname).filter(shopname => shopname.includes(senderInputValue));
      setShopnames(filteredUsers);
      console.log(filteredUsers);
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

  const handleFilterClose = () =>{
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


  return (
    <div className='right_div'>
      <div className='header_title'>
        <div className='linking'>
          <p className='mess_title'>Send Message</p>
          <a href='#' onClick={handleClick} data-target='old_messages' id='history'>History</a>
        </div>
        <a href='#' onClick={handleClick} data-target='mess_content' id='message'>Send Message</a>
      </div>
      {activeDiv === "old_messages" && <div id="old_messages">
        <table className="messages_table">
          <thead>
            <tr className="col_titles">
              <th style={{ fontSize: "1.6rem" }}>Date and Time</th>
              <th style={{ fontSize: "1.6rem" }}>Shop Name</th>
              <th style={{ fontSize: "1.6rem" }}>Title</th>
            </tr>
          </thead>
          <tbody>
            {sent_messages && sent_messages.map(da_ti => (
              <tr key={da_ti._id}>
                <td className="key" style={{ width: "20rem" }}> {da_ti.timeSent.slice(0, 10)} <br /> {da_ti.timeSent.slice(11, 19)}</td>
                <td className='key' style={{ color: "white" }}>{da_ti.receiver.map((receiver, index) => (<span key={receiver._id}>{receiver.shopname}</span>))}</td>
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
              <input id='shopname_input' type='text' placeholder='Enter Shop(s) Name' onChange={handleInputChange} />
              {isOpenFilter && (<div className={`filter_box ${isOpenFilter ? "show" : ""}`}>
                <p>Here is the content</p>
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
  )
}

export default Message;


