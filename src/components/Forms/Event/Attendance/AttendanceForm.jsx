import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../../';
import databaseService from '../../../../services/database.services';
import useCustomReactQuery from '../../../../utils/useCustomReactQuery';
import { useNavigate, useParams } from 'react-router-dom';
function AttendanceForm({ attendanceList }) {
  const { eventId } = useParams();
  // here attendance is an array of objects which has name, status, and id
  const fetchAllUsers = useCallback(() => databaseService.fetchAllUsers(), []);
  const { loading, error, data: allUsers } = useCustomReactQuery(fetchAllUsers);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const navigate = useNavigate();
  useEffect(() => {
    if (allUsers) {
      setFilteredUsers(allUsers);
    }
  }, [allUsers]);

  const handleSearch = (query) => {
    setSearch(query);
    if (query === '' || query.length == 0 || query.trim().length == 0) {
      setFilteredUsers(allUsers);
      return;
    }
    query = query.trim();
    const filteredUsers = allUsers.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        user.username?.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(query.toLowerCase()) ||
        (user.firstName + ' ' + user.lastName).toLowerCase().includes(query.toLowerCase()) ||
        user.username?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };
  const { register, handleSubmit, setValue } = useForm();

  // update the default values of the form if attendanceList is present
  if (attendanceList && attendanceList.length > 0) {
    attendanceList.forEach((attendance) => {
      setValue(attendance.userId, attendance.status === 'present' ? true : false);
    });
  }

  const submit = async (data) => {
    const attendanceList = allUsers.map((user) => {
      return {
        userId: user._id,
        status: data[user._id],
      };
    });

    try {
      const response = await databaseService.addAttendance({ eventId, attendanceList });
      if (response.statusCode === 200) {
        navigate(`/event/attendance/${eventId}`);
      }
    } catch (error) {
      console.error('Error while adding attendance', error);
    }
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
      <h2 className="text-3xl font-bold text-center mb-6">Attendance</h2>
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
            <div className="flex justify-around items-center mt-4">
              <p className="text-lg font-semibold text-gray-700">
                Total Users: {filteredUsers?.length}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Present: {filteredUsers?.filter((user) => user.status === 'present')?.length}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                Absent: {filteredUsers?.filter((user) => user.status === 'absent')?.length}
              </p>
            </div>
          </div>
        </>
      }

      <form onSubmit={handleSubmit(submit)} className="border border-gray-200 p-4 rounded-lg mt-4">
        {filteredUsers &&
          filteredUsers.length !== 0 &&
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center w-full justify-around border-b border-gray-200 py-2 px-2"
            >
              <label
                htmlFor={user._id}
                className="text-xl w-full font-semibold text-gray-700 cursor-pointer"
              >
                <p className="text-lg font-semibold text-gray-700">
                  {user?.firstName + ' ' + user?.lastName}
                </p>
                <p className="text-sm  text-gray-500 ">{'@' + user?.username}</p>
              </label>
              <input
                type="checkbox"
                name={user._id}
                id={user._id}
                {...register(user._id)}
                className="mr-2 cursor-pointer  scale-150"
              />
            </div>
          ))}
        <div className="flex gap-4 mt-4">
          <Button type="submit">Update</Button>
          <Button
            type="button"
            onClick={() => navigate(`/event/attendance/${eventId}`)}
            className="bg-gray-500 text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AttendanceForm;
