import { useState } from 'react';
import UserDetails from './UserDetails.jsx';
import { useSelector } from 'react-redux';
import { UserDetailsForm, UserAttendanceProfile } from '../../components/index.js';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [isEditing, setEditing] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  return (
    <div className="container mx-auto">
      {/* User Details or Edit Mode */}
      {isEditing ? (
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <UserDetailsForm user={user} setEditing={setEditing} />
          </div>
        </div>
      ) : (
        <>
          <UserDetails user={user} setEditing={setEditing} />
        </>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2 justify-center ">
        <div className="space-y-4 text-center">
          <p className="text-sm text-gray-600 italic text-left mx-auto w-11/12">
            <Link
              to="/update-password"
              className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
            >
              Click here to change password
            </Link>
          </p>
          <p className="text-sm text-gray-600 italic text-left mx-auto w-11/12">
            * You can manage your profile details like{' '}
            <span className="font-medium text-gray-800">Achievements</span>,{' '}
            <span className="font-medium text-gray-800">Talents</span>, and{' '}
            <span className="font-medium text-gray-800">Parent Details</span> directly from the side
            drawer or home page.
          </p>
        </div>
      </div>

      {/* Attendance Report */}
      {<UserAttendanceProfile />}
    </div>
  );
}

export default UserProfile;
