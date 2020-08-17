// React and react-router
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './Containers/Generic/Navbar';

// Redux
import { useDispatch } from 'react-redux';
import {
  AddFirstAndSecondNamesAction,
  AddUserDate,
  AddUserStatus,
} from './Redux/Actions/mainActions';

// Firebase
import { auth, db, storageRef } from './Firebase';

import { IFriend } from './_Types/appTypes';

// Pages
const Auth = React.lazy(() => import('./Pages/Auth'));
const Main = React.lazy(() => import('./Pages/User/Main'));
const Profile = React.lazy(() => import('./Pages/User/Profile'));
const UsersProfile = React.lazy(() => import('./Pages/Users/UsersProfile'));
const Friends = React.lazy(() => import('./Pages/User/Friends'));
const UsersSearch = React.lazy(() => import('./Pages/Users/UsersSearch'));

// ==== Main function ====
function App() {
  // Create dispatch
  const dispatch = useDispatch();

  const [userId, setUserID] = useState<string | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setUserID(auth.currentUser?.uid);

    // If there is a logged in user, set it in user state
    auth.onAuthStateChanged((person) => {
      setUserID(person?.uid);
      setLoaded(true);
    });
    if (userId) {
      db.collection('users')
        .doc(userId)
        // Get found document
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            // Get data from document fields
            const firstName: string = snapshot.data()?.userInfo.firstName;
            const secondName: string = snapshot.data()?.userInfo.secondName;
            const birthday: string = snapshot.data()?.userInfo.birthday;
            const status: string = snapshot.data()?.userInfo.status;

            // Create new action with user info
            // Dispatch action to reducer
            dispatch(
              AddFirstAndSecondNamesAction({
                firstName,
                secondName,
              })
            );
            dispatch(AddUserDate(birthday));
            dispatch(AddUserStatus(status));
          }
        });

      // Get the current user document from firebase
      db.collection('users')
        .doc(userId)
        .get()
        .then((user) => {
          if (user.exists) {
            // Get the friends from local storage
            const friends = JSON.parse(localStorage.getItem('friends')!);
            if (user.data()?.friends) {
              // Take every friend
              user.data()?.friends.map((friend: IFriend) => {
                // Get friend photo
                storageRef
                  .child(friend.user)
                  .child('photo')
                  .getDownloadURL()
                  .then((photo) => {
                    // Check if the friend photo is not the same as before
                    if (photo !== friend.photo) {
                      db.collection('users')
                        .doc(userId)
                        .update({
                          // Update the friend photo if array of friends in
                          friends: friends.map((item: IFriend) =>
                            item.name === friend.name
                              ? {
                                  name: item.name,
                                  user: item.user,
                                  photo: photo,
                                }
                              : item
                          ),
                        })
                        .then(() => {
                          // Set new array of friends in local storage
                          localStorage.setItem(
                            'friends',
                            JSON.stringify(user.data()?.friends)
                          );
                        });
                    }
                  });
              });
            }

            if (
              // Check if  friends in user document in firebase is not equel to friends array in local storage
              // to not load again the friends array from firebase
              user.data()?.friends !== friends &&
              // And that there is friends array is exist
              friends !== undefined &&
              user.data()?.friends !== undefined
            ) {
              // Set friends in local storage
              localStorage.setItem(
                'friends',
                JSON.stringify(user.data()?.friends)
              );
            }
          }
        });
    }
  }, [userId, dispatch]);
  return (
    <React.Suspense fallback={<></>}>
      <Router>
        <Switch>
          {loaded ? (
            <>
              {auth.currentUser && loaded ? (
                <>
                  <Navbar user={userId} />
                  <Route path='/signup'>
                    <Redirect exact from='/signup' to='/' />
                  </Route>
                  <Route exact path='/'>
                    <Main />
                  </Route>
                  <Route path={`/${auth.currentUser?.uid}`}>
                    <Profile />
                  </Route>
                  <Route path='/search'>
                    <UsersSearch />
                  </Route>
                  <Route path='/messages'></Route>
                  <Route path='/friends'>
                    <Friends />
                  </Route>
                  <Route path='/users/*' component={UsersProfile} />
                </>
              ) : (
                <>
                  <Route exact path='/'>
                    <Auth type='login' />
                  </Route>
                  <Route path='/signup'>
                    <Auth type='signup' />
                  </Route>
                </>
              )}
            </>
          ) : (
            ''
          )}
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
