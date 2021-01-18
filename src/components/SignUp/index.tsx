import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';

// import firebaseContext from '../Firebase/context';
// import Firebase from '../Firebase/firebase';
import * as ROUTES from '../../constants/routes';

const initialState: SignUpInterface = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
};

interface SignUpInterface {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  error: null,
}

type SignUpActions =
| { type: 'name' | 'email' | 'password' | 'confirmPassword' }
| { type: 'field'; fieldName: string; payload: string };

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
    default:
      throw new Error();
  }
};

const SignUpForm = () => {
  // const firebase = useContext(firebaseContext);
  const [state, dispatch] = useReducer(SignUpReducer, initialState);

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onInputChange = (event: any):void => {
    dispatch({ type: 'field', fieldName: event.target.name, payload: event.target.value });
  };

  const { name, email, password, confirmPassword, error } = state;
  const isInvalid = password !== confirmPassword
      || password === ''
      || email === ''
      || name === '';

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
            name="username"
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
