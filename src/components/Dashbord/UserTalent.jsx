import React, { useCallback, useEffect, useState } from 'react';
import { X, Pencil, Trash } from 'lucide-react';
import { TalentForm, Button, Modal, UserTalentCard } from '../index.js';
import { useSelector, useDispatch } from 'react-redux';
import { setEditableUserTalent } from '../../slices/dashboard/dashboardSlice.js';
import databaseService from '../../services/database.services.js';
import { Talent } from '../../pages/index';

function UserTalent() {
  const userId = useSelector((state) => state.dashboard.editableUser?._id);
  const talents = useSelector((state) => state.dashboard.editableUserTalent);
  const userName = useSelector((state) => state.dashboard.editableUser?.firstName);

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleDelete = async (talentId) => {
    if (!window.confirm('Are you sure want to delete talent?')) {
      return;
    }
    try {
      await databaseService.deleteTalent({ talentId }, userId);
      dispatch(
        setEditableUserTalent(talents.filter((talent) => (talent._id != talentId ? true : false)))
      );
      closeModal();
    } catch (error) {
      console.error('Error deleting talent:', error);
    }
  };

  const handleAdd = () => {
    setModalTitle('Add Talent');
    setModalContent(<TalentForm closeForm={closeModal} isUsedWithModal={true} />);
    openModal();
  };
  const handleEdit = (talent) => {
    setModalTitle('Edit Talent');
    setModalContent(<TalentForm isUsedWithModal={true} talent={talent} closeForm={closeModal} />);
    openModal();
  };
  const handleClick = (talent) => {
    setModalTitle(talent?.heading);
    setModalContent(
      <>
        <Talent id={talent?._id} isUsedWithModal={true} />
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => handleEdit(talent)} variant="ghost">
            <Pencil className="w-5 h-5" />
          </Button>
          <Button onClick={() => handleDelete(talent._id)} variant="ghost">
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

      {Array.isArray(talents) && talents.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center text-[#C30E59] mb-6">{`${userName}'s Talents`}</h2>
          <div
            className="w-full space-y-4
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4
        "
          >
            {talents.map((talent) => (
              <UserTalentCard
                isUsedWithModal={true}
                key={talent._id}
                talent={talent}
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
          Add Talent
        </Button>
      </div>
    </div>
  );
}

export default UserTalent;
