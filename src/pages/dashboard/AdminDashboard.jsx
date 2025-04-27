import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/index.js';
import { Users, Cake, UserPlus, LayoutDashboard } from 'lucide-react';
import { useSelector } from 'react-redux';

function AdminDashboard() {
  const navigate = useNavigate();
  const isSuperAdmin = useSelector((state) => state.auth.userData?.isSuperAdmin);

  return (
    <div className=" min-h-screen flex flex-col items-center p-2 sm:w-full">
      <div className="w-full  max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">
            Welcome! Manage your users and their details efficiently.
          </p>
        </div>

        {/* Top Illustration */}
        <div className="flex justify-center mb-6">
          <img
            src={'/dashboardIllustration.png'}
            alt="Dashboard Illustration"
            className="w-48 sm:w-60 md:w-72"
          />
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/dashboard/all-users')}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full"
          >
            <Users className="w-5 h-5" />
            View All Users
          </Button>

          <Button
            onClick={() => navigate('/dashboard/birthdays')}
            className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white w-full"
          >
            <Cake className="w-5 h-5" />
            Birthday Details
          </Button>

          <Button
            onClick={() => navigate('/dashboard/add-registered-user')}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white w-full col-span-1 sm:col-span-2"
          >
            <UserPlus className="w-5 h-5" />
            Add Registered User
          </Button>

          {isSuperAdmin && (
            <Button
              onClick={() => navigate('/dashboard/manage-users')}
              className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white w-full"
            >
              <Users className="w-5 h-5" />
              Manage Users
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
