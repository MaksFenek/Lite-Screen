import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDoc } from '../../../api/firebaseAPI';

import Friends from '../../../components/CurrentUser/Friends/Friends';

const Following = () => {
  const [people, setPeople] = useState<any>();
  const [userName, setUserName] = useState<string>('');

  const userId =  useParams<{id:string}>().id

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
  return <Friends people={people} type='following' userName={userName} />;
};

export default Following;
