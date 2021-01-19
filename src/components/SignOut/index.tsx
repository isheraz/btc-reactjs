/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { FirebaseContext } from '../Firebase/context';

const SignOutButton = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <button className="text-white" type="button" onClick={firebase!.signOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
