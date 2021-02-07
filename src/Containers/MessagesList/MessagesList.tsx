// React
import React, { useEffect, useState } from 'react';

// Styles and material ui
import './MessagesList.scss';

// Components
import UserChatItem from '../../components/UserChatItem/UserChatItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/rootReducer';
import { GetUsersChatsThunk } from '../../Redux/Actions/chatsAction';

interface IChatItem {
  name: string;
  id: string;
  photo: string;
  lastMessage: string;
}

const Messages: React.FC = () => {
  const state = useSelector((state: RootReducerInterface) => state);
  const chatsState = state.chats;
  const dispatch = useDispatch();
  const userId = state.auth.userId;
  const [chats, setChats] = useState<IChatItem[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (userId) {
      if (!loaded && chatsState.count === 0) {
        setLoaded(true);
        dispatch(GetUsersChatsThunk(userId!));
      }
    }
  }, [userId, dispatch, chatsState, loaded]);

  useEffect(() => {
    setChats(chatsState.chats);
  }, [chatsState, chats]);

  return (
    <section className='main'>
      <div className='container'>
        {chats &&
          chats.map((chat, index) => (
            <UserChatItem
              id={chat.id}
              name={chat.name}
              photo={chat.photo}
              lastMessage={chat.lastMessage}
              key={index}
            />
          ))}
      </div>
    </section>
  );
};

export default React.memo(Messages);
