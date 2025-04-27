import { useNavigate } from 'react-router-dom';

function UserParentCard({ parent, handleClick, isUsedWithModal = false }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (isUsedWithModal) {
      handleClick(parent);
    } else {
      navigate(`/parent/${parent._id}`);
    }
  };

  return parent ? (
    <div
      key={parent._id}
      className="flex flex-col sm:flex-row justify-between items-center 
      bg-rgba(255,255,255,0.8)
      p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
      onClick={() => handleCardClick(parent)}
    >
      {/* Parent Info */}
      <p className="font-semibold text-lg text-center sm:text-left">{`${parent.role} - ${parent.fullName}`}</p>

      {/* Action Buttons */}
      {/* <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-center sm:justify-end">
      <Button
        onClick={() => navigate(`/parent/${parent._id}`)}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        View
      </Button>
      <Button
        onClick={() => navigate(`/parent/edit/${parent._id}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDelete(parent._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </Button>
    </div> */}
    </div>
  ) : null;
}

export default UserParentCard;
