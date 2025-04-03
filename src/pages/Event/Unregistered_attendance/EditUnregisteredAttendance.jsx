import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { UnregisteredAttendanceForm } from '../../../components';
import databaseService from '../../../services/database.services';
import useCustomReactQuery from '../../../utils/useCustomReactQuery';

function EditUnregisteredAttendance() {
  const { unregisteredAttendanceId } = useParams();
  const fetchUnregisteredAttendance = useCallback(
    () => databaseService.getUnregisteredAttendanceById({ unregisteredAttendanceId }),
    [unregisteredAttendanceId]
  );
  const {
    data: unregisteredAttendance,
    loading,
    error,
  } = useCustomReactQuery(fetchUnregisteredAttendance);
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
    <>
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Unregistered Attendance</h2>

        <UnregisteredAttendanceForm UnregisteredAttendance={unregisteredAttendance} />
      </div>
    </>
  );
}

export default EditUnregisteredAttendance;
