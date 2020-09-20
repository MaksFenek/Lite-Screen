import React, { useEffect, useState } from 'react';
import { getUserDoc } from '../../../api/firebaseAPI';
import { getAllFollowers } from '../../../api/friendsAPI';

import Friends from '../../../components/CurrentUser/Friends/Friends';

export interface IPeople {
  user: string;
  name: string;
}

const Followers = () => {
  const [people, setPeople] = useState<IPeople[]>();
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
        // Set user Firstname in state
        setUserName(user.data()?.userInfo.firstName);
        // Get all followers by user id and user name
        getAllFollowers(userId)?.then((users) => {
          // Set all followers in state
          users.forEach((aUser) => {
            setPeople((all) =>
              all
                ? [
                    ...all,
                    {
                      name:
                        aUser.data().userInfo.firstName +
                        ' ' +
                        aUser.data().userInfo.secondName,
                      user: aUser.ref.id,
                    },
                  ]
                : [
                    {
                      name:
                        aUser.data().userInfo.firstName +
                        ' ' +
                        aUser.data().userInfo.secondName,
                      user: aUser.ref.id,
                    },
                  ]
            );
          });
        });
      });
  }, []);

  return <Friends people={people} type='followers' userName={userName} />;
};

export default Followers;
