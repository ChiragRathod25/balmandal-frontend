import { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import {
  LoadingComponent,
  ErrorComponent,
  Button,
  Modal,
  UpdatePasswordForm,
  UpdateUsernameForm,
} from '../../components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../slices/userSlice/authSlice.js';
import { Power, Edit2Icon, Edit3Icon } from 'lucide-react'; // Lucide icons, simple and sharp
import { useNavigate } from 'react-router-dom';

function ManageUsers() {
  const currentUserId = useSelector((state) => state.auth.userData._id);
  const fetchAllUsers = useCallback(() => databaseService.fetchAllUsers(), []);
  const { data, loading, error } = useCustomReactQuery(fetchAllUsers);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const [updateError, setUpdateError] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setAllUsers(data);
      setUsers(data);
    }
  }, [data]);

  const [search, setSearch] = useState('');

  //model
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCloseModal = () => {
    setModalTitle('');
    setModalContent(null);
    closeModal();
  };

  const handleSearch = (query) => {
    setSearch(query);
    if (query === '' || query.length == 0 || query.trim().length == 0) {
      setUsers(allUsers);
      return;
    }
    query = query.trim();
    const filteredUsers = allUsers.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(query.toLowerCase()) ||
        user.middleName?.toLowerCase().includes(query.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(query.toLowerCase()) ||
        user.username?.toLowerCase().includes(query.toLowerCase())
      // user.mediumOfStudy?.toLowerCase().includes(query.toLowerCase())
      // user.mobile?.toLowerCase().includes(query.toLowerCase()) ||
      // user.email?.toLowerCase().includes(query.toLowerCase()) ||
      // user.school?.toLowerCase().includes(query.toLowerCase()) ||
    );
    setUsers(filteredUsers);
  };

  const handleActiveStatusToggle = async (userId) => {
    //confirm the action
    if (!window.confirm('Are you sure want to change the status?')) {
      return;
    }

    const user = users.find((user) => user._id === userId);
    if (!user) {
      setUpdateError('User not found ');
      return;
    }
    const updatedUser = { ...user, isActive: !user.isActive };
    try {
      await databaseService.toggleActiveStatus(userId);
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? updatedUser : user)));
      setUpdateError(null);
    } catch (error) {
      console.error('Error updating user status:', error);
      setUpdateError('Failed to update user status');
    }
  };

  const handleUpdateUserName = (username, userId) => {
    // update the username in the users state
    const user = users.find((user) => user._id === userId);
    if (!user) {
      setUpdateError('User not found ');
      return;
    }
    const updatedUser = { ...user, username: username };
    setAllUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? updatedUser : user)));
    setUpdateError(null);

    // if current user is the same as the updated user, update the username in the redux store
    if (userId === currentUserId) {
      dispatch(updateUser({ ...user, username: username }));
    }
  };

  const handleChangePassword = (userId) => {
    setModalTitle('Update Password');
    setModalContent(
      <UpdatePasswordForm closeForm={handleCloseModal} userId={userId} isUsedWithModal={true} />
    );
    openModal();
  };

  const handleChangeUsername = (userId) => {
    setModalTitle('Update Username');
    setModalContent(
      <UpdateUsernameForm
        closeForm={handleCloseModal}
        userId={userId}
        handleUpdateUserName={handleUpdateUserName}
        isUsedWithModal={true}
      />
    );
    openModal();
  };

  if (loading) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent errorMsg={error} />;
  }
  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>

      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-900">
        Manage Users
      </h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 text-sm md:text-base bg-white"
        />
      </div>

      {/* User List */}
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
                {user?.avatar ? (
                  <img
                    src={user?.avatar}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </span>
                ) 
                }
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-500 text-sm 
                  underline
                "
                onClick={()=>navigate(`/dashboard/user/${user._id}`)}
                >@{user?.username}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-4 mt-4 sm:mt-0 sm">
              <Button
                onClick={() => handleActiveStatusToggle(user._id)}
                className={`flex items-center gap-1 ${
                  user?.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                } text-white px-3 py-2 rounded-md text-xs font-semibold transition 
                `}
              >
                <Power size={16} />
                {user?.isActive ? 'Deactivate' : 'Activate'}
              </Button>

              <Button
                onClick={() => handleChangePassword(user._id)}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-xs font-semibold transition"
              >
                <Edit2Icon size={16} />
                Password
              </Button>

              <Button
                onClick={() => handleChangeUsername(user._id)}
                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-xs font-semibold transition"
              >
                <Edit3Icon size={16} />
                Username
              </Button>
            </div>

            {/* Error */}
            {updateError && (
              <div className="w-full mt-2 text-center">
                <p className="text-red-500 text-xs">{updateError}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageUsers;
