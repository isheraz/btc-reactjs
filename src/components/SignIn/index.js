/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .signIn(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex flex-col items-center justify-center px-2 py-20">
          <form
            className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            onSubmit={this.onFormSubmit}
          >
            <h1 className="mb-8 text-3xl text-center">SIGN IN</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.onInputChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.onInputChange}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-500 text-white"
            >
              Login
            </button>

            {error && (
              <p className="text-red-500 py-5 text-center text-xs">
                {error.message}
              </p>
            )}
          </form>

          <div className="text-grey-dark mt-6">
            Do not have have an account?&nbsp;
            <Link
              className="no-underline border-b border-blue text-blue"
              to={ROUTES.SIGN_UP}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
