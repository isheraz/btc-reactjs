/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const { email, passwordOne } = this.state;
    this.props.firebase
      .createUser(email, passwordOne)
      .then((authUser) => {
        console.log(authUser);
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
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex flex-col items-center justify-center px-2 py-20">
          <form
            className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            onSubmit={this.onFormSubmit}
          >
            <h1 className="mb-8 text-3xl text-center">SIGN UP</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.onInputChange}
            />

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
              name="passwordOne"
              placeholder="Password"
              value={passwordOne}
              onChange={this.onInputChange}
            />
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="passwordTwo"
              placeholder="Confirm Password"
              value={passwordTwo}
              onChange={this.onInputChange}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className="w-full text-center py-3 rounded bg-blue-500 text-white"
            >
              Create Account
            </button>

            {error && (
              <p className="text-red-500 py-5 text-center text-xs">
                {error.message}
              </p>
            )}
          </form>

          <div className="text-grey-dark mt-6">
            Already have an account?&nbsp;
            <Link
              className="no-underline border-b border-blue text-blue"
              to={ROUTES.SIGN_IN}
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don not have an account?
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
