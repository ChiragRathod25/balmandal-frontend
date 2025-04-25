import { AttendanceForm, ErrorComponent, LoadingComponent } from '../../../components/index.js';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';
import databaseService from '../../../services/database.services.js';
import useCustomReactQuery from '../../../utils/useCustomReactQuery.js';

function EditAttendance() {
    const { eventId } = useParams();
    const fetchAttendance = useCallback(
      () => databaseService.getAttendanceByEventId({ eventId }),
      [eventId]
    );
    
    const { loading, error, data: attendanceList } = useCustomReactQuery(fetchAttendance);
    if (loading) {
      return <LoadingComponent/>
    }
    if (error) {
     return <ErrorComponent errorMsg={error} />
    }
    
    return (
    <AttendanceForm  attendanceList={attendanceList} />
  )
}

export default EditAttendance