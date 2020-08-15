import {
  AddFirstAndSecondNamesAction,
  AddUserDate,
  AddUserStatus,
} from './mainActions';
import { AddUserInSearch } from './usersActions';

import {
  ADD_FIRST_AND_SECOND_NAMES,
  ADD_USER_DATE,
  ADD_USER_STATUS,
  ADD_USER_IN_SEARCH,
} from '../Constants';

describe('Action should return ', () => {
  const firstName = 'Arthur ';
  const secondName = 'Moore ';
  const date = '2020-08-10';
  const status = 'Hi, my dear friend. Remember that I like you';
  const link = 'lJFZuJB1auOwDlHDt93wQoMKqox1';
  const photo =
    'https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FlJFZuJB1auOwDlHDt93wQoMKqox1%2Fphoto?alt=media&token=a17bcc74-4d4e-4dc7-b675-52e5e1f56a71';

  it('firstname and secondname', () => {
    expect(AddFirstAndSecondNamesAction({ firstName, secondName })).toEqual({
      type: ADD_FIRST_AND_SECOND_NAMES,
      payload: { firstName, secondName },
    });
  });

  it('new birthday date', () => {
    expect(AddUserDate(date)).toEqual({ type: ADD_USER_DATE, payload: date });
  });

  it('new status', () => {
    expect(AddUserStatus(status)).toEqual({
      type: ADD_USER_STATUS,
      payload: status,
    });
  });

  it(' user in search', () => {
    expect(AddUserInSearch(firstName, link, photo)).toEqual({
      type: ADD_USER_IN_SEARCH,
      payload: { name: firstName, link, photo },
    });
  });
});
