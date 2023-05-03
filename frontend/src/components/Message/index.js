import './message.css';
import React from "react";
import { useState } from 'react';
import axios from "axios";
import Button1 from '../Button1/Button';

const Message = () => {

  const [activeDiv, setActiveDiv] = useState('old_messages');
  const [actveLink, setActiveLink] = useState('');
  const senderId = localStorage.getItem('id').toString();
  const [sent_messages,setSent_messages] = useState('')
  const [date_time, setDate_time] = useState('');
  const [shopnames, setShopnames] = useState('');

  const handleClick = async (event) => {
    event.preventDefault();
    const target = event.target.getAttribute("data-target");
    setActiveDiv(target);
    setActiveLink(event.target.hash);
    await getSentMessages(senderId);
  }

  const getSentMessages = async (senderId) => {
    try {
      const sent = await axios.get(`http://127.0.0.1:3000/message/sentMessages/${senderId}`);
      const sent_messages = sent.data;
      setSent_messages(sent_messages);
      console.log(sent_messages);
      const date_time = sent_messages.map((message) => message.timeSent);
      setDate_time(date_time);
      // console.log(date_time);
      const shopnames = sent_messages.map((message) => message.receiver.map
        ((receiver) => {
          const { shopname } = receiver;
          return { shopname };
        })
      );
      setShopnames(shopnames);
      // console.log(shopnames)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
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
              <th style={{fontSize:"1.6rem"}}>Date and Time</th>
              <th  style={{fontSize:"1.6rem"}}>Shop Name</th>
              <th  style={{fontSize:"1.6rem"}}>Title</th>
            </tr>
          </thead>
          <tbody>
            {sent_messages && sent_messages.map(da_ti => (
              <tr key={da_ti._id}>
                <td className="key" style={{width:"20rem"}}>{da_ti.timeSent.replace(/T/," || ").replace(/Z/,"")}</td>
                <td>hello</td>
                <td id='last_col'>hello</td>
              </tr>
            )).reverse()}
          </tbody>
        </table>
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
              <input id='shopname_input' type='text' placeholder='Enter Shop(s) Name' />
              <input id='title_input' type='text' placeholder='Enter message Title' />
            </div>
          </div>
          <div className='message_box'>
            <textarea id='text_input' placeholder='Insert Your Message' />
          </div>
          <div className='send_but'>
            <Button1>Send</Button1>
          </div>
        </div>}
    </div>
  )
}

export default Message;


