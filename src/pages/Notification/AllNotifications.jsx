// to get all notifications of the user ,
// if user?='id', user notificatinos 
// createdBy?='id' for getNotificationsByCreaterId
import  { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import { useSelector } from 'react-redux';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useNavigate } from 'react-router-dom';
import { Button, QueryHandler } from '../../components';

function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const userId = useSelector((state) => state.auth.userData._id);
  const fetchNotifications = useCallback(() => databaseService.getUserNotifications(userId), [userId]);
  const { loading, data, error } = useCustomReactQuery(fetchNotifications);
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin === true);
  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  return (
    <QueryHandler queries={[{ loading, error }]}> 
      <div className="max-w-4xl mx-auto p-4 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6">Your Notifications</h2>
        {
          isAdmin && (
            <div className="flex justify-center items-center space-x-2">
              <Button
                onClick={() => navigate('/notification/add')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
              >
                Create Notification
              </Button>
            </div>
          )
        }

        {!loading && notifications.length === 0 && (
          <p className="text-center text-gray-500">No notifications found.</p>
        )}

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
              onClick={() => navigate(`/notification/${notification._id}`)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{notification?.title}</h3>
              <div className="whitespace-pre-wrap flex flex-row gap-2">

              <p className="text-gray-700 text-sm sm:text-base">{notification?.message}</p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Created At: {new Date(notification?.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllNotifications;
