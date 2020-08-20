import React from 'react';
import Auth from '../Auth';
import { MemoryRouter } from 'react-router-dom';
import renderer from '../../../components/UserListItem/__tests__/node_modules/react-test-renderer';

describe('<Auth/>', () => {
  const LoginTree = renderer.create(
    <MemoryRouter>
      <Auth type='login' />
    </MemoryRouter>
  );
  const SignupTree = renderer.create(
    <MemoryRouter>
      <Auth type='signup' />
    </MemoryRouter>
  );

  it('should render correctly', () => {
    expect(LoginTree).toMatchSnapshot();
    expect(SignupTree).toMatchSnapshot();
  });
});
