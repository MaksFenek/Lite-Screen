import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDoc } from '../../../api/firebaseAPI';

import Friends from '../../../components/CurrentUser/Friends/Friends';
import { RootReducerInterface } from '../../../Redux/Reducers/rootReducer';

const Following: React.FC = () => {
  const state = useSelector((store: RootReducerInterface) => store.auth);
  const currentUserId = state.userId;

  const [people, setPeople] = useState<any>();
  const [userName, setUserName] = useState<string>('');

  const userId = useParams<{ id: string }>().id;

  useEffect(() => {
    // Get user document
    getUserDoc(userId)
      .get()
      .then((user) => {
        setUserName(user.data()?.userInfo.firstName);
        // Get all friends
        setPeople(user.data()?.friends);
      });
  }, [userId]);
  return (
    <Friends
      people={people}
      type='following'
      userName={userName}
      currentUserId={currentUserId}
    />
  );
};

export default React.memo(Following);
