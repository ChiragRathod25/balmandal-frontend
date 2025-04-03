import { useNavigate } from 'react-router-dom';

function UserTalentCard({ talent,handleClick,isUsedWithModal=false }) {
  const navigate=useNavigate()
  const handleCardClick = (talent) => {
    if (isUsedWithModal) {
      handleClick(talent);
    } else {
      navigate(`/talent/${talent._id}`);
    }
  }

  const getHeroImage = (talent) => {
    // let hero ='https://images.unsplash.com/photo-1620398722262-969d8f2bc875?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2lkcyUyMGRyYXdpbmd8ZW58MHx8MHx8fDA%3D';
    let hero='/talentHero.avif';

    const files = talent?.images;
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.includes('image')) {
          hero = file;
          return hero;
        }
      }
    }
    return hero;
  };

  return (
    <div
      key={talent._id}
      className="flex flex-col sm:flex-row justify-between items-center 
      bg-rgba(255,255,255,0.8)
      p-2 rounded-lg shadow-md hover:bg-gray-200 transition-all" 
      onClick={() => handleCardClick(talent)} 
    >
      {/* Image & Title */}
       <div className="flex items-center gap-4 w-full sm:w-auto">
    
          <img
            src={getHeroImage(talent)}
            alt={talent?.heading}
            className="w-14 h-14 object-cover rounded-md border border-gray-300"
          />
     
        <p className="font-semibold text-lg text-center sm:text-left">{talent?.heading}</p>
      </div>
      {/* <div className="flex gap-2 mt-4 lg:mt-0">
        <Button
          onClick={() => navigate(`/talent/${talent._id}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          View
        </Button>
        <Button
          onClick={() => navigate(`/talent/edit/${talent._id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(talent._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </Button> 
      </div>
        */}
    </div>
  );
}

export default UserTalentCard;
