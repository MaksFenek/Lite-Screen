import React, { useEffect, useState } from 'react';
import { getUserDoc } from '../../../api/firebaseAPI';

import Friends from '../../../components/CurrentUser/Friends/Friends';

const Following = () => {
  const [people, setPeople] = useState<any>();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userId = document.location.pathname
      .split('')
      .filter((item: string, index: number) => index > 10 && item)
      .join('');

    // Get user document

    getUserDoc(userId)
      .get()
      .then((user) => {
        setUserName(user.data()?.userInfo.firstName);
        // Get all friends
        setPeople(user.data()?.friends);
      });
  }, []);
  return <Friends people={people} type='following' userName={userName} />;
};

export default Following;
