import React, { useCallback } from 'react';
import { ErrorComponent, LoadingComponent, UserAttendanceCard } from '../index.js';
import { useSelector } from 'react-redux';
import databaseService from '../../services/database.services.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';

function UserAttendance() {
  const userId = useSelector((state) => state.auth.userData._id);
  const fetchUserAttendance = useCallback(
    () => databaseService.getAttendanceByUserId({ userId }),
    [userId]
  );
  const { data: userAttendance, loading, error } = useCustomReactQuery(fetchUserAttendance);

  if (loading) {
    return (
      <LoadingComponent/>
    );
  }
  if (error) {
    return <ErrorComponent errorMsg={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Attendance</h2>

      {userAttendance?.length === 0 ? (
        <div className="text-center text-gray-600">No Attendance Records Found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userAttendance?.map((attendance) => (
            <UserAttendanceCard key={attendance._id} attendance={attendance} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserAttendance;
