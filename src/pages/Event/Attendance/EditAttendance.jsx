import { AttendanceForm } from '../../../components'
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import databaseService from '../../../services/database.services';
import useCustomReactQuery from '../../../utils/useCustomReactQuery';

function EditAttendance() {
    const { eventId } = useParams();
    const fetchAttendance = useCallback(
      () => databaseService.getAttendanceByEventId({ eventId }),
      [eventId]
    );
    
    const { loading, error, data: attendanceList } = useCustomReactQuery(fetchAttendance);
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
    <AttendanceForm  attendanceList={attendanceList} />
  )
}

export default EditAttendance