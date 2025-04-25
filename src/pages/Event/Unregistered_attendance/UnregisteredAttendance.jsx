// this will display One unregistered attendance info
import  { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services.js';
import useCustomReactQuery from '../../../utils/useCustomReactQuery.js';
import { Button, ErrorComponent, LoadingComponent } from '../../../components/index.js';

function UnregisteredAttendance() {
  const { unregisteredAttendanceId } = useParams();
  const navigate = useNavigate();

  const fetchUnregisteredAttendance = useCallback(
    () => databaseService.getUnregisteredAttendanceById({ unregisteredAttendanceId }),
    [unregisteredAttendanceId]
  );

  const {
    data: UnregisteredAttendance,
    loading,
    error,
  } = useCustomReactQuery(fetchUnregisteredAttendance);

  if (loading) {
   return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent errorMsg={error} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold border-b pb-3 mb-4">Unregistered Attendance Details</h1>

      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Full Name:</span>
          <span>{UnregisteredAttendance.fullName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Mobile:</span>
          <span>{UnregisteredAttendance.mobile}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>{UnregisteredAttendance.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Remark:</span>
          <span>{UnregisteredAttendance.remark}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <span
            className={`font-semibold ${UnregisteredAttendance.status === 'present' ? 'text-green-600' : 'text-red-600'}`}
          >
            {UnregisteredAttendance.status}
          </span>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          onClick={() =>
            navigate(`/event/attendance/unregistered/edit/${unregisteredAttendanceId}`)
          }
        >
          Edit
        </Button>
        <Button
          onClick={() => navigate(`/event/attendance/${UnregisteredAttendance.eventId}`)}
          type="button"
          className="bg-gray-500 text-white"
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default UnregisteredAttendance;
