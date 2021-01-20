/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
import { memo, useEffect, useState } from 'react';
import { getUsers, storageURL } from '../services/firebase';

// prop types validations
interface memoData {
  [x: string]: any;
  users?: [];
}

const MemoizedData = memo(
  (props: { users: memoData }) => {
    const { users } = props;
    return (
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map(
          (user: {
            uid: string;
            imagePath: string;
            firstName: string;
            lastName: string;
            email: string;
            role: string;
          }) => (
            <tr
              key={user.uid}
              className="transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`${storageURL}${encodeURIComponent(
                        user.imagePath
                      )}?alt=media`}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{user.uid}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {user.role}
              </td>
            </tr>
          )
        )}
      </tbody>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.users === nextProps.users) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  }
);

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      await getUsers()
        .then((data) => setUsers(data))
        .catch((err) => setError(err.toString()));
    };
    getData();
    console.log(Date.now());
  }, []);

  return (
    <div>
      {users.length > 0 && (
        <div>
          <h2>Users</h2>
          <div className="flex flex-col mt-6">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                  <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          UID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Role
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <MemoizedData users={users} />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default Users;
