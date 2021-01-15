import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOut from '../SignOut';

const Navigation = () => (
  <div className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <ul className="flex">
      <li className="mr-6">
        <Link className="text-white" to={ROUTES.SIGN_IN}>
          Sign In
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-white" to={ROUTES.LANDING}>
          Landing
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-white" to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-white" to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-white" to={ROUTES.ADMIN}>
          Admin
        </Link>
      </li>
      <li className="mr-6">
        <SignOut />
      </li>
    </ul>
  </div>
);

export default Navigation;
