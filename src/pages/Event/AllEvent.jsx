import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { Button, QueryHandler, EventCard } from '../../components';

function AllEvent() {
  const navigate = useNavigate();

  const fetchAllEvents = useCallback(() => databaseService.getEvents(), []);
  const { loading, error, data: events } = useCustomReactQuery(fetchAllEvents);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        {Array.isArray(events) && events.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Events</h2>
            <div className="m-2 flex justify-center">
              <Button
                onClick={() => navigate('/event/add')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add Event
              </Button>
             
            </div>

            <div className="w-full     grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
              {events.map((event) => (
                <EventCard event={event} key={event?._id} />
              ))}
            </div>
          </>
        )}
      </div>
    </QueryHandler>
  );
}

export default AllEvent;
