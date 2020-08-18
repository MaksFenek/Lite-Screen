import mainReducer from './mainReducer';
import usersReducer from './searchReducer';

import {
  AddFirstAndSecondNamesAction,
  AddUserDate,
  AddUserStatus,
} from '../Actions/mainActions';
import { AddLoaded, AddUserInSearch } from '../Actions/searchActions';

describe('Reducer should return the state', () => {
  const initialState = {
    firstName: '',
    secondName: '',
    date: '',
    status: '',
  };

  const initialUsersState = {
    users: [],
    count: 0,
    loaded: false,
    photo: '',
  };

  const firstName = 'Arthur ';
  const secondName = 'Moore ';
  const date = '2020-08-10';
  const status = 'Hi, my dear friend. Remember that I like you';
  const link = 'lJFZuJB1auOwDlHDt93wQoMKqox1';
  const photo =
    'https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FlJFZuJB1auOwDlHDt93wQoMKqox1%2Fphoto?alt=media&token=a17bcc74-4d4e-4dc7-b675-52e5e1f56a71';

  it('with new firstname and secondname', () => {
    expect(
      mainReducer(
        initialState,
        AddFirstAndSecondNamesAction({ firstName, secondName })
      )
    ).toEqual({ firstName, secondName, date: '', status: '' });
  });

  it('with new date', () => {
    expect(mainReducer(initialState, AddUserDate(date))).toEqual({
      firstName: '',
      secondName: '',
      date,
      status: '',
    });
  });

  it(' with new user status', () => {
    expect(mainReducer(initialState, AddUserStatus(status))).toEqual({
      firstName: '',
      secondName: '',
      date: '',
      status,
    });
  });

  it('with new user in search', () => {
    expect(
      usersReducer(initialUsersState, AddUserInSearch(firstName, link, photo))
    ).toEqual({
      users: [{ name: firstName, link, photo }],
      count: 1,
      loaded: false,
      photo: '',
    });
  });

  it('with new loaded status', () => {
    expect(usersReducer(initialUsersState, AddLoaded)).toEqual({
      users: [],
      count: 0,
      loaded: true,
      photo: '',
    });
  });
});
