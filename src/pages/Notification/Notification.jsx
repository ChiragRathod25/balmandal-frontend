import { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services.js';
import { useNavigate, useParams } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { Button, QueryHandler } from '../../components/index.js';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

function Notification() {
  const [Notification, setNotification] = useState({});
  const { notificationId } = useParams();
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const fetchNotification = useCallback(
    () => databaseService.getNotificationById({ notificationId }),
    [notificationId]
  );
  const navigate = useNavigate();

  const { loading, data, error } = useCustomReactQuery(fetchNotification);
  useEffect(() => {
    if (data) {
      setNotification(data);
    }
  }, [data]);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{Notification?.title}</h2>

        <div className="whitespace-pre-wrap flex flex-row gap-2">
          <div>
            <p className="font-semibold text-gray-800 mb-1">Message:</p>
          </div>
          <div className="whitespace-pre-wrap flex flex-row gap-2">
            <p className="text-gray-700 text-sm sm:text-base">
              {
                Notification?.notificationContent && Notification?.notificationContent.length > 0
                ? parse(Notification.notificationContent)
                :Notification?.message ? parse(Notification?.message) : 'No message available'
              }
            </p>
          </div>
        </div>

        {/* <p className="text-gray-700 mb-2"><span className="font-semibold">Message:</span> {}</p> */}
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Created By:</span> {Notification?.createdBy}
        </p>

        {/* Add more fields as necessary */}

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start mt-6">
          {/* {Notification?.link && (
            <Button
              onClick={() => window.open(Notification.link, '_blank')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
              Open Link
            </Button>
          )} */}

          <Button
            onClick={() => navigate('/notification')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
          >
            Back to Notifications
          </Button>

        </div>
      </div>
    </QueryHandler>
  );
}

export default Notification;
