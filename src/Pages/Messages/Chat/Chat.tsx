import { InputBase } from '@material-ui/core';
import React from 'react';

import './Chat.scss';
import SendIcon from '@material-ui/icons/Send';
import Message from '../../../Containers/User/UserChatItem/Message/Message';

export default function Chat() {
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
}
