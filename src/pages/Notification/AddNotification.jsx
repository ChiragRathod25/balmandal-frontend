import { NotificationForm } from '../../components/index.js';

function AddNotification() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Notification</h2>
      <NotificationForm />
    </div>
  );
}

export default AddNotification;
