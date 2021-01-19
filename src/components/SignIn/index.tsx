import React, { BaseSyntheticEvent, useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase/context';

/**
 * Interfaces
 */
interface SignInInterface {
  email: string,
  password: string,
  error: null,
}

/**
 * Types
 */
type SignInActions = {
  type: 'email' | 'password' | 'reset' | 'error',
  payload: any
}

/**
 * Constants
 */
const initialState: SignInInterface = {
  email: '',
  password: '',
  error: null,
};

/**
 * Reducer for dispatching onChange and onSubmit events
 * @param state
 * @param action
 */
const reducer = (state:SignInInterface, action: SignInActions) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'reset':
      return { ...state, email: '', password: '' };
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

/**
 * Sign In form functional component
 */
const SignInForm = () => {
  const firebase = useContext(FirebaseContext);
  const [state, dispatch] = useReducer(reducer, { ...initialState });
  const { email, password, error } = state;
  const isInvalid = password === '' || email === '';

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(firebase, initialState);
    firebase!.signIn(email, password)
      .then(() => {
        dispatch({ type: 'reset', payload: initialState });
      })
      .catch((err) => {
        dispatch({ type: 'error', payload: err.message });
      });
  };

  const onInputChange = (event: BaseSyntheticEvent) => {
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
