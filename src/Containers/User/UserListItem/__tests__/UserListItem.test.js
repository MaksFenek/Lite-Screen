import React from 'react';
import UserListItem from '../UserListItem';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('<UserListItem/>', () => {
  const id = 'lJFZuJB1auOwDlHDt93wQoMKqox1';
  const name = 'Arthur Moore';
  const photo =
    'https://firebasestorage.googleapis.com/v0/b/lite-screen.appspot.com/o/users%2FlJFZuJB1auOwDlHDt93wQoMKqox1%2Fphoto?alt=media&token=32f7fd3d-41fd-480b-bfea-b482a42fa49f';

  //   const wrapper = mount(<UserListItem />);
  const wrapper = mount(
    <MemoryRouter>
      <UserListItem id={id} name={name} photo={photo} isFriend={false} />
    </MemoryRouter>
  );

  const WrapperTree = renderer
    .create(
      <MemoryRouter>
        <UserListItem id={id} name={name} photo={photo} isFriend={false} />
      </MemoryRouter>
    )
    .toJSON();
  it('should render correctly', () => {
    expect(WrapperTree).toMatchSnapshot();
  });

  it('should contain all components', () => {
    expect(wrapper.find(`img[src='${photo}']`).exists()).toBeTruthy();
    expect(wrapper.find(`Link[to='/users/${id}']`).exists()).toBeTruthy();
    expect(wrapper.find('h4').text()).toEqual(name);
    expect(wrapper.find('button')).toHaveLength(2);
  });
});
