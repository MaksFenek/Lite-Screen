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
    <div className={userId === author ? 'message own' : 'message'}>
      <p>{text}</p>
      <span>{date}</span>
    </div>
  );
};

export default React.memo(Message);
