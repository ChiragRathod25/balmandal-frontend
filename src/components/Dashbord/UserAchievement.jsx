import { useState } from 'react';
import { X, Pencil, Trash } from 'lucide-react';
import { AchievementForm, Modal, Button } from '../index.js';
import { useSelector, useDispatch } from 'react-redux';
import UserAchievementCard from '../Profile/UserAchievementCard.jsx';
import { Achievement } from '../../pages/index.js';
import databaseService from '../../services/database.services.js';
import { setEditableUserAchievement } from '../../slices/dashboard/dashboardSlice.js';

function UserAchievement() {
  const dispatch = useDispatch();

  const achievements = useSelector((state) => state.dashboard.editableUserAchievement);
  const userId = useSelector((state) => state.dashboard.editableUser?._id);
  const userName = useSelector((state) => state.dashboard?.editableUser?.firstName);

  // for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); 
  const [modalTitle, setModalTitle] = useState('');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const handleDelete = async (achievementId) => {
    if (!window.confirm('Are you sure want to delete achievement?')) {
      return;
    }
    try {
      await databaseService.deleteAchievement({ achievementId }, userId);
      dispatch(
        setEditableUserAchievement(
          achievements.filter((achievement) => (achievement._id != achievementId ? true : false))
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };
  const handleAdd = () => {
    setModalTitle('Add Achievement');
    setModalContent(<AchievementForm closeForm={closeModal} isUsedWithModal={true} />);
    openModal();
  };
  const handleEdit = (achievement) => {
    setModalTitle('Edit Achievement');
    setModalContent(
      <AchievementForm isUsedWithModal={true} achievement={achievement} closeForm={closeModal} />
    );
    openModal();
  };
  const handleClick = (achievement) => {
    setModalTitle(achievement.title);
    setModalContent(
      <>
        <Achievement id={achievement?._id} isUsedWithModal={true} />
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => handleEdit(achievement)} variant="ghost">
            <Pencil className="w-5 h-5" />
          </Button>
          <Button onClick={() => handleDelete(achievement._id)} variant="ghost">
            <Trash className="w-5 h-5 text-red-500" />
          </Button>
          <Button onClick={closeModal} variant="ghost">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </>
    );
    openModal();
  };

  return (
    <div
      className="container 
      mx-auto
      p-4"
    >
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>

      {Array.isArray(achievements) && achievements?.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center text-[#C30E59] mb-6">{`${userName}'s Achievements`}</h2>
          <div
            className="w-full space-y-4
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4
          "
          >
            {achievements.map((achievement) => (
              <UserAchievementCard
              key={achievement._id}
              isUsedWithModal={true}
                achievement={achievement}
                handleClick={handleClick}
              />
            ))}
          </div>
        </>
      )}

      <div className="w-full flex justify-center mt-6">
        <Button
          onClick={handleAdd}
          className="bg-[#10B981] text-white hover:bg-[#059669] px-6 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          Add Achievement
        </Button>
      </div>
    </div>
  );
}

export default UserAchievement;
