// React
import React, { useEffect, useState } from 'react';

// Styles and material ui
import './MessagesList.scss';

// Components
import UserChatItem from '../../components/UserChatItem/UserChatItem';
import { auth } from '../../api/firebaseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';
import { GetUsersChatsThunk } from '../../Redux/Actions/chatsAction';

interface IChatItem {
  name: string;
  id: string;
  photo: string;
}

export default function Messages() {
  const state = useSelector((state: RootReducerInterface) => state.chats);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<string | undefined>('');
  const [chats, setChats] = useState<IChatItem[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setUserId(auth.currentUser?.uid);
    if (userId) {
      if (!loaded && state.count === 0) {
        setLoaded(true);
        dispatch(GetUsersChatsThunk(userId!));
      }
    }
  }, [userId, dispatch, state, chats, loaded]);
  useEffect(() => {
    setChats(state.chats);
  }, [state, chats]);
  return (
    <section className='main'>
      <div className='container'>
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
    </section>
  );
}
