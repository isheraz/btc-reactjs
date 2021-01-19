import React, { BaseSyntheticEvent, useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase/context';

/**
 * Interfaces
 */
interface SignUpInterface {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  error: null,
}

/**
 * Types
 */
type SignUpActions = {
  type: 'name' | 'email' | 'password' | 'confirmPassword' | 'reset' | 'error',
  payload: any
}

/**
 * Constants
 */
const initialState: SignUpInterface = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

/**
 * Reducer for dispatching onChange and onSubmit events
 * @param state
 * @param action
 */
const SignUpReducer = (state: SignUpInterface, action: SignUpActions) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'confirmPassword':
      return { ...state, confirmPassword: action.payload };
    case 'reset':
      return { ...state, name: '', email: '', password: '', confirmPassword: '' };
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

/**
 * Sign Up form functional component
 */
const SignUpForm = () => {
  const firebase = useContext(FirebaseContext);
  const [state, dispatch] = useReducer(SignUpReducer, { ...initialState });
  const { name, email, password, confirmPassword, error } = state;
  const isInvalid = password !== confirmPassword
      || password === ''
      || email === ''
      || name === '';

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    firebase!.createUser(email, password)
      .then((authUser) => {
        console.log(authUser);
        dispatch({ type: 'reset', payload: initialState });
        // this.props.history.push(ROUTES.HOME);
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
          <h1 className="mb-8 text-3xl text-center">SIGN UP</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Username"
            value={name}
            onChange={onInputChange}
          />

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
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onInputChange}
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
            { error }
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
};

/**
 * Sign Up link to navigate from Sign In component
 */
const SignUpLink = () => (
  <p>
    Don not have an account?
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export {
  SignUpForm, SignUpLink,
};
