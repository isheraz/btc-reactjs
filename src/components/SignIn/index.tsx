import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const initialState: SignIpInterface = {
  email: '',
  password: '',
  error: null,
};

interface SignIpInterface {
  email: string,
  password: string,
  error: null,
}

type SignIpActions = {
  type: 'email' | 'password',
  payload: string
}

const reducer = (state:SignIpInterface, action: SignIpActions) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    default:
      throw new Error();
  }
};

const SignInForm = () => {
  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const { email, password, error } = state;
  const isInvalid = password === '' || email === '';

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onInputChange = (event: any): void => {
    dispatch({ type: event.target.name, payload: event.target.value });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex flex-col items-center justify-center px-2 py-20">
        <form
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={onFormSubmit}
        >
          <h1 className="mb-8 text-3xl text-center">SIGN IN</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onInputChange}
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
            {error}
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
};

export default SignInForm;
