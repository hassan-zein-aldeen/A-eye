import './message.css';
import React from "react";
import { useState } from 'react';
import axios from "axios";
import Button1 from '../Button1/Button';

const Message = () => {
  return (
    <div>
      <p className='mess_title'>Send Message</p>
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
      </div>
    </div>
  )
}

export default Message;