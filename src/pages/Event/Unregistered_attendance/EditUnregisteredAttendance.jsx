import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  ErrorComponent,
  LoadingComponent,
  UnregisteredAttendanceForm,
} from '../../../components/index.js';
import databaseService from '../../../services/database.services.js';
import useCustomReactQuery from '../../../utils/useCustomReactQuery.js';

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
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent errorMsg={error} />;
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
