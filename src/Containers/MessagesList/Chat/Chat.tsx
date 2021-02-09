// React
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// Styles and material ui
import './Chat.scss';
import { InputBase } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GetUsersChatsThunk } from '../../../Redux/Actions/chatsAction';
import { RootReducerInterface } from '../../../Redux/Reducers/rootReducer';
import { IChatItem } from '../../../Redux/Reducers/chatsReducer';

// Components
import Message from '../../../components/UserChatItem/Message/Message';
import UserChatItem from '../../../components/UserChatItem/UserChatItem';

// API
import {
  deleteMessage,
  getAllMessages,
  sendMessage,
} from '../../../api/messagesAPI';
import { getUserDoc } from '../../../api/firebaseAPI';
import moment from 'moment';

export interface IMessageItem {
  author: string;
  text: string;
  date: string;
  messageId: number;
  isEdited?: boolean;
  reply?: IReply;
}

export interface IReply {
  text: string;
  answerId: number;
  date: string;
  author: 'you' | 'friend';
}

export interface IEdit {
  massageId: number;
  text: string;
}

const Chat = () => {
  const state = useSelector((state: RootReducerInterface) => state);
  const stateChats = state.chats.chats;
  const currentUser = state.auth.userId;
  const [chats, setChats] = useState<IChatItem[]>([]);
  const [messages, setMessages] = useState<IMessageItem[]>([]);
  const [name, setName] = useState<string>('');

  const [reply, setReply] = useState<IReply>();

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const userId = useParams<{ id: string }>().id;

  useEffect(() => {
    // Get all messages from firebase
    getAllMessages(userId, setMessages);
    getUserDoc(userId)
      .get()
      .then((user) =>
        // Get companion's name
        setName(
          user.data()?.userInfo.firstName +
            ' ' +
            user.data()?.userInfo.secondName
        )
      );
  }, [userId]);

  useEffect(() => {
    if (stateChats.length === 0) {
      // Get user chats
      dispatch(GetUsersChatsThunk(currentUser!));
    }
  }, [currentUser, dispatch, stateChats.length]);

  useEffect(() => {
    setChats(stateChats);
  }, [stateChats]);

  const handleClick = useCallback((): void => {
    // Get the date
    const date = new Date().getTime();

    if (inputRef.current!.value !== '') {
      setReply(undefined);
      sendMessage(userId, inputRef.current!.value, date, reply);
      inputRef.current!.value = '';
    }
  }, [inputRef, setReply, userId, reply]);

  const handlePress = useCallback(
    (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const handleClearReply = useCallback((): void => {
    setReply(undefined);
  }, [setReply]);

  return (
    <div className='main'>
      <div className='container'>
        <div className='chats-wrapper'>
          <div className='chat-user'>
            <Link to={`/messages/`}>
              <ArrowBackIcon />
            </Link>
            <span>
              <Link to={`/users/${userId}`}>{name}</Link>
            </span>
          </div>
          <div className='chat'>
            <div
              className='chat-messages'
              style={reply && { marginBottom: '60px' }}>
              {messages.map((item: any, index: number) => (
                <Message
                  currentUserId={currentUser}
                  text={item.text}
                  author={item.author}
                  userId={userId}
                  date={item.date}
                  key={index}
                  answerId={item.messageId}
                  setReply={setReply}
                  reply={item.reply}
                  name={name}
                  deleteMessage={deleteMessage}
                />
              ))}
            </div>
            <div className='chat-input'>
              {reply && (
                <div className='chat-input-reply'>
                  {reply.author === 'you' ? <h3>You:</h3> : <h3>{name}:</h3>}
                  <p data-testid='message-text'>
                    {reply?.text.substring(0, 60)}
                    {reply?.text.length > 60 && '....'}
                  </p>
                  <span className='date' data-testid='message-date'>
                    {moment(reply?.date).format('hh:mm')}
                  </span>
                  <span className='times' onClick={handleClearReply}>
                    &times;
                  </span>
                </div>
              )}
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
          <div className='last-chats'>
            <h2>Chats</h2>
            {chats &&
              chats.map((chat, index) => (
                <UserChatItem
                  id={chat.id}
                  name={chat.name}
                  photo={chat.photo}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
