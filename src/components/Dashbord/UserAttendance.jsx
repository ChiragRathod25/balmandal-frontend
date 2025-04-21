import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import databaseService from '../../services/database.services.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { UserAttendanceCard } from '../index.js';

function UserAttendance() {
  const userId = useSelector((state) => state.dashboard.editableUser?._id);
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    if (userId) {
      setUserStatus(true);
    } else {
      setUserStatus(false);
    }
  }, [userId]);

  const fetchUserAttendance = useCallback(() => {
    if (userId) {
      return databaseService.getAttendanceByUserId({ userId });
    } else {
      return Promise.resolve([]);
    }
  }, [userId]);

  const { data: userAttendance, loading, error } = useCustomReactQuery(fetchUserAttendance);

  if (loading || !userStatus) {
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {userAttendance && userAttendance.length === 0 && <div>No Attendance</div>}
        {userAttendance &&
          userAttendance.length > 0 &&
          Array.isArray(userAttendance) &&
          userAttendance.map((attendance) => {
            return <UserAttendanceCard key={attendance._id} attendance={attendance} />;
          })}
      </div>
    </>
  );
}

export default UserAttendance;
