import React from 'react';

import './Message.scss';

interface IMessage {
  text: string;
  date: string;
}

const Message: React.FC<IMessage> = ({ text, date }) => {
  return (
    <div className='message'>
      <p>{text}</p>
      <span>{date}</span>
    </div>
  );
};

export default Message;
