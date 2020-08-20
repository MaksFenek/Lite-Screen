import React from 'react';

import AuthForm from '../AuthForm';
import { shallow } from '../../../../components/UserListItem/__tests__/node_modules/enzyme';
import renderer from '../../../../components/UserListItem/__tests__/node_modules/react-test-renderer';

describe('<AuthForm/>', () => {
  const wrapperLogin = shallow(<AuthForm type='login' />);
  const wrapperSignup = shallow(<AuthForm type='signup' />);

  const LoginTree = renderer.create(<AuthForm type='login' />).toJSON();
  const SignupTree = renderer.create(<AuthForm type='signup' />).toJSON();

  it('should render correctly', () => {
    expect(LoginTree).toMatchSnapshot();
    expect(SignupTree).toMatchSnapshot();
  });

  it('login should contain all forms', () => {
    console.log(wrapperLogin.find('button').debug());
    const inputs = wrapperLogin.find('.auth-form-input');

    expect(inputs).toHaveLength(2);
    expect(wrapperLogin.find('h3').text()).toEqual('Login');
  });

  it('signup should contain all forms', () => {
    const inputs = wrapperSignup.find('.auth-form-input');

    expect(inputs).toHaveLength(4);
    expect(wrapperSignup.find('h3').text()).toEqual('Sign Up');
  });
});
