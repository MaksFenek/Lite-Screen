// React
import React from 'react';
import { Link } from 'react-router-dom';
// Styles and material ui
import './Chat.scss';
import { InputBase } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Components
import Message from '../../../components/UserChatItem/Message/Message';
import { getAllMessages, sendMessage } from '../../../api/messagesAPI';
import { getUserDoc } from '../../../api/firebaseAPI';

const Chat = () => {
  const [messages, setMessages] = React.useState<any[]>([]);
  const [name, setName] = React.useState<string>('');

  const inputRef = React.useRef<HTMLInputElement>(null);
  const userId = document.location.pathname
    .split('')
    .filter((item: string, index: number) => index > 9 && item)
    .join('');

  React.useEffect(() => {
    getAllMessages(userId, setMessages);
    getUserDoc(userId)
      .get()
      .then((user) =>
        setName(
          user.data()?.userInfo.firstName +
            ' ' +
            user.data()?.userInfo.secondName
        )
      );
  }, [userId]);

  const handleClick = () => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes().valueOf();
    const date = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    if (inputRef.current!.value !== '') {
      sendMessage(userId, inputRef.current!.value, date);
      inputRef.current!.value = '';
    }
  };
  const handlePress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };
  return (
    <div className='main'>
      <div className='container'>
        <div className='chat-user'>
          <Link to={`/messages/`}>
            <ArrowBackIcon />
          </Link>
          <span>
            <Link to={`/users/${userId}`}>{name}</Link>
          </span>
        </div>
        <div className='chat'>
          <div className='chat-messages'>
            {messages.map((item: any, index: number) => (
              <Message
                text={item.text}
                author={item.author}
                date={item.date}
                key={index}
              />
            ))}
          </div>
          <div className='chat-input'>
            <InputBase
              autoFocus
              onKeyPress={handlePress}
              multiline
              rowsMax='2'
              inputRef={inputRef}
              className='chat-input-field'
              placeholder='Write something'
              inputProps={{ 'aria-label': 'write' }}
            />
            <div className='chat-input-icon' onClick={handleClick}>
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
