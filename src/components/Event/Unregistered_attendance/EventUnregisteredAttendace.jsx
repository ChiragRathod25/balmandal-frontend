// this will display unregistered attendies of one event list view, 
// if click on that redirect to the unregistered attendies details page 
// where we can see the details of that unregistered attendies and we can also delete and edit that unregistered attendies 
// and also we can add the new unregistered attendies
import { useCallback } from 'react';
import { Button, ErrorComponent, LoadingComponent } from '../../index.js';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../../services/database.services.js';
import useCustomReactQuery from '../../../utils/useCustomReactQuery.js';

function EventUnregisteredAttendance() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const fetchEventUnregisteredAttendance = useCallback(
    () => databaseService.getUnregisteredAttendanceByEventId({ eventId }),
    [eventId]
  );

  const { data: unregisteredAttendance, loading, error } = useCustomReactQuery(fetchEventUnregisteredAttendance);

  if (loading) {
   return <LoadingComponent/>
  }

  if (error) {
   return <ErrorComponent errorMsg={error} />
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unregistered Attendees</h2>

      {unregisteredAttendance?.length === 0 ? (
        <div className="text-center text-gray-600 mb-4">No unregistered attendees found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unregisteredAttendance?.map((attendee) => (
            <div
              key={attendee._id}
              className="border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition cursor-pointer"
              onClick={() => navigate(`/event/attendance/unregistered/${attendee._id}`)}
            >
              <h3 className="text-lg font-semibold text-gray-900">{attendee.fullName}</h3>
              <p className="text-gray-600 text-sm">{attendee.mobile}</p>
              <p className="text-gray-600 text-sm">{attendee.email}</p>
              {attendee.remark && <p className="text-gray-500 text-sm italic">{attendee.remark}</p>}
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full mt-2 inline-block
                  ${attendee.status === 'present' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
              >
                {attendee.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add Unregistered Attendee Button */}
      <div className="mt-6 flex justify-center">
        <Button onClick={() => navigate(`/event/attendance/unregistered/add/${eventId}`)}>
          Add Unregistered Attendee
        </Button>
      </div>
    </div>
  );
}

export default EventUnregisteredAttendance;
