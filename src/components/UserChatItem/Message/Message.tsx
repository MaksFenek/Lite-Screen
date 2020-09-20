// React
import React from 'react';
import { auth } from '../../../api/firebaseAPI';

// Components
import './Message.scss';

// ==== TypeScript ====
interface IMessage {
  text: string;
  date: string;
  author: string;
}

const Message: React.FC<IMessage> = ({ text, date, author }) => {
  const userId = auth.currentUser?.uid;
  return (
    <div data-testid='message' className={userId === author ? 'message own' : 'message'} >
      <p data-testid='message-text'>{text}</p>
      <span data-testid='message-date'>{date}</span>
    </div>
  );
};

export default React.memo(Message);
