import './message.css';
import React from "react";
import { useState } from 'react';
import axios from "axios";
import Button1 from '../Button1/Button';

const Message = () => {

  const [activeDiv, setActiveDiv] = useState('old_messages');
  const [actveLink, setActiveLink] = useState('');
  const senderId = localStorage.getItem('id').toString();

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
      console.log(sent_messages);
      const shopnames = sent_messages.map((message) => message.receiver.map
        ((receiver) => {
          const { id, shopname } = receiver;
          return { id, shopname };
        })
      );
      console.log(shopnames)
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
      {activeDiv === "old_messages" && <div id="old_messages">This is first section</div>}
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