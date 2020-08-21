import React, { useEffect, useState } from 'react';
import { getUserDoc } from '../../../api/firebaseAPI';
import { getAllFollowing } from '../../../api/friendsAPI';

import Friends from '../../../components/CurrentUser/Friends/Friends';

const Followers = () => {
  const [people, setPeople] = useState<any>();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Get page pathname
    const userId = document.location.pathname
      .split('')
      .filter((item: string, index: number) => index > 10 && item)
      .join('');

    getUserDoc(userId)
      .get()
      .then((user) => {
        // Get user fullname
        const name = `${user.data()?.userInfo.firstName} ${
          user.data()?.userInfo.secondName
        }`;
        // Set user Firstname in state
        setUserName(user.data()?.userInfo.firstName);
        // Get all followers by user id and user name
        getAllFollowing(userId, name)?.then((users) => {
          // Create array for followers
          let array: any[] = [];

          users.forEach((aUser) => {
            // Add in recently created array new followers
            array.push(...array, {
              name:
                aUser.data().userInfo.firstName +
                ' ' +
                aUser.data().userInfo.secondName,
              user: aUser.ref.id,
            });
            // Set the array in state
            setPeople(array);
          });
        });
      });
  }, []);

  return <Friends people={people} type='followers' userName={userName} />;
};

export default Followers;
