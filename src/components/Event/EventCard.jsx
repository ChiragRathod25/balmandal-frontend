import { useNavigate } from 'react-router-dom';
function EventCard({ event }) {
    const navigate = useNavigate();
    const getHeroImage = (event) => {
        // let hero = 'https://plus.unsplash.com/premium_photo-1683749809341-23a70a91b195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWNoaWV2ZW1lbnR8ZW58MHx8MHx8fDA%3D';
        let hero='/eventDefault.webp';

        const files = event?.media;
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

    const hanleClick = () => { 

        navigate(`/event/${event._id}`);
    }

    const formatToLocalDatetimeInput = (utcDateString) => {
    if (!utcDateString) return '';

    // Event utcDateString 2025-04-22T20:30:00.000Z
    // Convert to local date
    const date=utcDateString.split('T')[0];
    const formattedDate = date.split('-').reverse().join('/');
    const time = utcDateString.split('T')[1];

    // convert time to 12 hour format
    const [hours, minutes] = time.split(':');
    const hours12 = (hours % 12) || 12; // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    const formattedTime = `${hours12}:${minutes} ${ampm}`;

    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    
    return formattedDateTime;
    
  }



    return (
    <div
      key={event._id}
      className="flex flex-col sm:flex-row justify-between items-center 
      bg-rgba(255,255,255,0.8)
      p-4 rounded-lg shadow-md hover:bg-gray-200 transition-all" 
      onClick={() => hanleClick()} 
    >
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={getHeroImage(event)}
          alt={event.title || 'Event'}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {
              event.startAt && event.endAt
                ? `${formatToLocalDatetimeInput(event.startAt)}`
                : 'Date not available'
            }
          </p>
          <p className="text-sm text-gray-500">{event.venue}</p>
        </div>
      </div>
      {/* <div className="flex gap-2 mt-4 lg:mt-0">
      <Button
        onClick={() => navigate(`/event/${event._id}`)}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        View
      </Button>
      <Button
        onClick={() => navigate(`/event/edit/${event._id}`)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Edit
      </Button>
      <Button
        onClick={() => handleDelete(event._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </Button>
    </div> */}
    </div>
  );
}

export default EventCard;
