import { useState } from 'react';
import { X, Pencil, Trash } from 'lucide-react';
import databaseService from '../../services/database.services';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ParentForm, Modal, Button } from '..';
import { setEditableUserParent } from '../../slices/dashboard/dashboardSlice';
import { Parent } from '../../pages/index';
import { UserParentCard } from '..';

function UserParent() {
  const { userId } = useParams();
  const parents = useSelector((state) => state.dashboard.editableUserParent);
  const userName = useSelector((state) => state.dashboard.editableUser?.firstName);
  const dispatch = useDispatch();

  //for Modal
  const [modalTitle, setModalTitle] = useState('');
  const [ModalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleDelete = async (parentId) => {
    if (!window.confirm('Are you sure you want to delete this parent?')) {
      return;
    }
    try {
      await databaseService.deleteParentDetails({ parentId }, userId);
      dispatch(
        setEditableUserParent(parents.filter((parent) => (parent._id != parentId ? true : false)))
      );
      closeModal();
    } catch (error) {
      console.error('Error deleting parent:', error);
    }
  };

  const handleEdit = (parent) => {
    setModalTitle('Edit Parent');
    setModalContent(<ParentForm isUsedWithModal={true} parent={parent} closeForm={closeModal} />);
    openModal();
  };

  const handleAdd = () => {
    setModalTitle('Add Parent');
    setModalContent(<ParentForm closeForm={closeModal} isUsedWithModal={true} />);
    openModal();
  };

  const handleClick = (parent) => {

    setModalTitle(parent.title);
    setModalContent(
      <>
        <Parent id={parent?._id} isUsedWithModal={true} />
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => handleEdit(parent)} variant="ghost">
            <Pencil className="w-5 h-5" />
          </Button>
          <Button onClick={() => handleDelete(parent._id)} variant="ghost">
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
    <div className="container mx-auto p-4">
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {ModalContent}
      </Modal>
      {Array.isArray(parents) && parents.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center text-[#C30E59] mb-6">{`${userName}'s Parents`}</h2>
          <div
            className="w-full space-y-4
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4
          "
          >
            {parents.map((parent) => (
              <UserParentCard 
              isUsedWithModal={true}
              key={parent._id} 
              parent={parent} 
              handleClick={handleClick} />
            ))}
          </div>
        </>
      )}

      <div className="w-full flex justify-center mt-6">
        <Button
          onClick={handleAdd}
          className="bg-[#10B981] text-white hover:bg-[#059669] px-6 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          Add Parent
        </Button>
      </div>
    </div>
  );
}

export default UserParent;
