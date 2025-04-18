import { Button } from '../';
import { useNavigate } from 'react-router-dom';

function UserCard({ user }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center space-y-4 w-full max-w-xs mx-auto transition-transform transform hover:scale-105">
      {/* Avatar Section */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C30E59]">
        <img
          src={user?.avatar || `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png`}
          alt="avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Information */}
      <div className="text-center">
        <p className="text-xl font-semibold text-[#C30E59]">{user?.firstName} {user?.lastName}</p>
        <p className="text-sm text-gray-600">Standard: <span className="font-medium">
          {user?.std || 'N/A'}
          {user?.mediumOfStudy && `(${user?.mediumOfStudy})`}
          </span></p>
        
        <p className="text-sm text-gray-600">Mobile: <span className="font-medium">{user?.mobile}</span></p>
      </div>

      {/* Button */}
      <Button
        onClick={() => navigate(`/dashboard/user/${user?._id}`)}
        className="bg-[#C30E59] text-white hover:bg-[#E82561] transition-all duration-300 ease-in-out px-4 py-2 rounded-lg shadow-md"
      >
        View Details
      </Button>
    </div>
  );
}

export default UserCard;
