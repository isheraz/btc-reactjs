/* eslint-disable react/prop-types */
import React from 'react';

import { FirebaseConsumer } from '../Firebase/context';

const SignOutButton = () => (
  <FirebaseConsumer>
    {(firebaseContext) => firebaseContext && (
    <button className="text-white" type="button" onClick={firebaseContext.signOut}>
      Sign Out
    </button>
    )}
  </FirebaseConsumer>
);

export default SignOutButton;
