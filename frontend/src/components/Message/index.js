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
          </div>
          <div className='mess_inputs'>
            <input id='shopname_input' type='text' placeholder='Enter Shop(s) Name' />
            <input id='title_input' type='text' placeholder='Enter message Title' />
          </div>
        </div>
        <div className='message_box'>
          <p>Text</p>
          <input id='text_input' type='text' placeholder='Inser Your Message' />
        </div>
        <Button1>Send</Button1>
      </div>
    </div>
  )
}

export default Message;