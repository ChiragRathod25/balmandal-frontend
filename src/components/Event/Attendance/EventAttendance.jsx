// this will display all the registered attendies of one event list view,
// if click on that redirect to the user profile page where we can see the details of that user and we can also delete and edit that user
import { useCallback } from 'react';
import { Button, ErrorComponent, LoadingComponent } from '../../index.js';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../../services/database.services.js';
import useCustomReactQuery from '../../../utils/useCustomReactQuery.js';

function EventAttendance() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const fetchAttendance = useCallback(
    () => databaseService.getAttendanceByEventId({ eventId }),
    [eventId]
  );
  const handleCall = (mobile) => {
    if (!mobile) {
      alert('Mobile number is not available for this user.');
      return;
    }
    window.open(`tel:${mobile}`, '_blank');
  };

  const { loading, error, data: attendanceList } = useCustomReactQuery(fetchAttendance);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent errorMsg={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event Attendance</h2>

      {attendanceList?.length === 0 ? (
        <div className="text-center text-gray-600 mb-4">No attendance marked</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {attendanceList?.map((attendance) => (
            <div
              key={attendance.userId}
              className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition cursor-pointer"
              // onClick={() => navigate(`/dashboard/user/${attendance.userId}`)}
            >
              <span className="flex items-center gap-4 mb-2 ">
                <h3 className="text-lg font-semibold text-gray-900 inline-block">
                  {attendance.user?.firstName} {attendance.user?.middleName}{' '}
                  {attendance.user?.lastName}
                  {/*Username */}
                </h3>

                {/* call button */}
                <span
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => handleCall(attendance.user?.mobile)}
                >
                  📞
                </span>
              </span>

              <span
                className={`px-3 py-1 text-sm font-medium rounded-full 
                  ${attendance.status === 'present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
              >
                {attendance.status}
              </span>

              {/*
                    Username button with link to user profile
                    */}
              <span
                className="
                  bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition mx-1
                "
                onClick={() => navigate(`/dashboard/user/${attendance.userId}`)}
              >
                {/* {attendance.user?.username ? `@${attendance.user.username}` : 'View Profile'} */}
                View Profile
              </span>

              {/* show deactivation label if the user is marked as activated */}
              {attendance.user?.isActive === false && (
                <span className="ml-2 px-3 py-1 text-sm font-medium bg-yellow-200 text-yellow-800 rounded-full">
                  Deactivated
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Buttons Section */}
      <div className="mt-6 flex gap-4">
        <Button onClick={() => navigate(`/event/attendance/edit/${eventId}`)}>
          {attendanceList.length === 0 ? 'Add' : 'Update'}
        </Button>
        <Button onClick={() => navigate(`/event/${eventId}`)}>Back</Button>
      </div>
    </div>
  );
}

export default EventAttendance;
