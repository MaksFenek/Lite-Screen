import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDoc } from '../../../api/firebaseAPI';
import { getAllFollowers } from '../../../api/friendsAPI';

import Friends from '../../../components/CurrentUser/Friends/Friends';
import { RootReducerInterface } from '../../../Redux/Reducers/rootReducer';

export interface IPeople {
  user: string;
  name: string;
}

const Followers: React.FC = () => {
  const state = useSelector((store: RootReducerInterface) => store.auth);
  const currentUserId = state.userId;

  const [people, setPeople] = useState<IPeople[]>();
  const [userName, setUserName] = useState<string>('');

  const userId = useParams<{ id: string }>().id;
  useEffect(() => {
    // Get page pathname
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
  }, [userId]);

  return (
    <Friends
      people={people}
      type='followers'
      userName={userName}
      currentUserId={currentUserId}
    />
  );
};

export default React.memo(Followers);
