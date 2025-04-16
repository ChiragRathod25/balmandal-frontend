import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { Button, QueryHandler, EventCard } from '../../components';
import { useSelector } from 'react-redux';

function AllEvent() {
  const navigate = useNavigate();

  const fetchAllEvents = useCallback(() => databaseService.getEvents(), []);
  const { loading, error, data: events } = useCustomReactQuery(fetchAllEvents);
  const isAdmin = useSelector((state) => state.auth.userData?.isAdmin);

  if (loading) {
    return <p className="text-center text-lg font-semibold mt-5">Loading Events...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg font-semibold mt-5">Error: {error}</p>;
  }

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Events</h2>
        {isAdmin && (
          <div className="m-2 flex justify-center">
            <Button
              onClick={() => navigate('/event/add')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Event
            </Button>
          </div>
        )}

        {Array.isArray(events) && events.length > 0 && (
          <>
            {events.length > 0 ? (
              <div className="w-full     grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                {events.map((event) => (
                  <EventCard event={event} key={event?._id} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">No events available.</div>
            )}
          </>
        )}
      </div>
    </QueryHandler>
  );
}

export default AllEvent;
