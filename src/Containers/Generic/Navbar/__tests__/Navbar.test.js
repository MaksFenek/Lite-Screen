import React from 'react';
import Navbar from '../Navbar';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

describe('<Navbar/>', () => {
  const id = 'lJFZuJB1auOwDlHDt93wQoMKqox1';

  const wrapperUser = mount(
    <MemoryRouter>
      <Navbar user={id}></Navbar>
    </MemoryRouter>
  );
  const wrapper = mount(
    <MemoryRouter>
      <Navbar>
        <Button variant='contained' color='primary'>
          Login
        </Button>
      </Navbar>
    </MemoryRouter>
  );

  const NavbarUserTree = renderer
    .create(
      <MemoryRouter>
        <Navbar user={id}></Navbar>
      </MemoryRouter>
    )
    .toJSON();

  it('should render correctly', () => {
    expect(NavbarUserTree).toMatchSnapshot();
  });

  it('should render all components', () => {
    expect(wrapperUser.find('.navbar-logo').find('svg').exists()).toBeTruthy();
    expect(wrapperUser.find('.user-navbar').find('button')).toHaveLength(5);
    expect(wrapperUser.find('#simple-menu').find('a')).toHaveLength(3);
    expect(wrapper.find('.navbar-logo').find('svg').exists()).toBeTruthy();
    expect(wrapper.find('.user-navbar').find('button').exists()).toBeFalsy();
    expect(wrapper.find('#simple-menu').find('a').exists()).toBeFalsy();
  });
});
