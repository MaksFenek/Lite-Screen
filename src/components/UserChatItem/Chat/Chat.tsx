// React
import React from 'react';

// Styles and material ui
import './Chat.scss';
import { InputBase } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Components
import Message from '../Message/Message';

const Chat = () => {
  return (
    <div className='main'>
      <div className='container'>
        <div className='chat'>
          <div className='chat-messages'>
            <Message text='Hi, my friend' date='11:00' />
          </div>
          <div className='chat-input'>
            <InputBase
              className='chat-input-field'
              placeholder='Write something'
              inputProps={{ 'aria-label': 'write' }}
            />
            <div className='chat-input-icon'>
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
