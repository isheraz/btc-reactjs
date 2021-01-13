import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
    <ul className="flex">
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to={ROUTES.SIGN_IN}>
          Sign In
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to={ROUTES.LANDING}>
          Landing
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>
      <li className="mr-6">
        <Link className="text-blue-500 hover:text-blue-800" to={ROUTES.ADMIN}>
          Admin
        </Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
