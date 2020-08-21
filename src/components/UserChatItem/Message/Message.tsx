// React
import React from 'react';

// Components
import './Message.scss';

// ==== TypeScript ====
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

export default React.memo(Message);
