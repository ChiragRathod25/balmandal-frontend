import { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { UserCard, Input } from '../../components';
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../../slices/dashboard/dashboardSlice';

function AllUsers() {
  const fetchAllUsers = useCallback(() => databaseService.fetchAllUsers(), []);
  const { data: allUsers, loading, error } = useCustomReactQuery(fetchAllUsers);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
      dispatch(setAllUsers(allUsers));
      setSearch('');
    }
  }, [allUsers]);

  const handleSearch = (query) => {
    setSearch(query);
    if (query === '' || query.length == 0 || query.trim().length == 0) {
      setUsers(allUsers);
      return;
    }
    query = query.trim();
    const filteredUsers = allUsers.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        user.middleName?.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(query.toLowerCase())
      // user.mediumOfStudy?.toLowerCase().includes(query.toLowerCase())
      // user.mobile?.toLowerCase().includes(query.toLowerCase()) ||
      // user.email?.toLowerCase().includes(query.toLowerCase()) ||
      // user.school?.toLowerCase().includes(query.toLowerCase()) ||
    );
    setUsers(filteredUsers);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center text-lg font-semibold">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Users</h2>
      {
        <>
          <div>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>
        </>
      }

      {users && users.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {users &&
            users.map((user) => (
              <div key={user._id} className="flex justify-center">
                <UserCard
                  user={user}
                  className="w-full max-w-xs shadow-lg rounded-lg overflow-hidden bg-white p-4"
                />
              </div>
            ))}
        </div>
      ) : (
        <>
          <div className="flex justify-center items-start min-h-screen text-lg font-semibold p-6">
            No users found
          </div>
        </>
      )}
    </div>
  );
}

export default AllUsers;
