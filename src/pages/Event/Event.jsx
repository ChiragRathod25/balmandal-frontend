import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QueryHandler, Button, FilesDisplayHelper } from '../../components';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useSelector } from 'react-redux';

function Event() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const fetchEvent = useCallback(() => databaseService.getEventById({ eventId }), [eventId]);
  const { data, loading, error } = useCustomReactQuery(fetchEvent);
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.userData?.isAdmin);

  useEffect(() => {
    if (!eventId) {
      navigate('/');
      return;
    }
    if (data) {
      setEvent(data);
    }
  }, [eventId, data, navigate]);

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    try {
      await databaseService.deleteEvent({ eventId });
      navigate('/event');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const formatToLocalDatetimeInput = (utcDateString) => {
    if (!utcDateString) return '';
    const date = new Date(utcDateString);

    // Get local offset-adjusted values
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() % 12 || 12).padStart(2, '0'); // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${year}-${month}-${day} | ${formattedTime}`;
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {event && (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-3xl font-bold text-gray-800 flex flex-wrap items-center gap-3 mb-4">
            <span className="text-blue-600">{event?.title}</span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full shadow-md ${
                event?.status === 'completed'
                  ? 'bg-green-100 text-green-600 border border-green-300'
                  : 'bg-red-100 text-red-600 border border-red-300'
              }`}
            >
              {event?.status}
            </span>
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="whitespace-pre-wrap flex flex-row gap-2">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Description:</p>
              </div>
              <div>
                <p>{event?.description}</p>
              </div>
            </div>

            <p>
              <span className="font-semibold">Venue:</span> {event?.venue}
            </p>
            {isAdmin && (
              <p>
                <span className="font-semibold">Event Type:</span> {event?.eventType}
              </p>
            )}
            <p>
              <span className="font-semibold">Start:</span>{' '}
              {formatToLocalDatetimeInput(event?.startAt) || ''}
            </p>
            <p>
              <span className="font-semibold">End:</span>{' '}
              {formatToLocalDatetimeInput(event?.endAt) || ''}
            </p>
            {isAdmin && (
              <p>
                <span className="font-semibold">Created By:</span> {event?.createdBy}
              </p>
            )}
          </div>

          {/* File Display Section */}
          {event?.media && event?.media.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Media</h3>
              <FilesDisplayHelper cloudFiles={event?.media} />
            </div>
          )}

          {isAdmin && (
            <div
              className="
           flex flex-col sm:flex-row gap-3 justify-center sm:justify-start mt-6 
            "
            >
              <Button
                onClick={() => navigate(`/event/attendance/${event._id}`)}
                className="bg-pink-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Attendance
              </Button>
              <Button
                onClick={() => navigate(`/event/edit/${event._id}`)}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Edit Event
              </Button>
              <Button
                onClick={() => handleDelete(event?._id)}
                className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Delete Event
              </Button>
              <Button
                onClick={() => navigate('/event')}
                className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
              >
                Manage Events
              </Button>
            </div>
          )}
        </div>
      )}
    </QueryHandler>
  );
}

export default Event;
