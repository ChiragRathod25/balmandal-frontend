// this will display attendance of one event || display users list of one event || Registered + Unregistered users list of one event
import { EventAttendance, EventUnregisteredAttendace } from '../../../components/index.js';

function Attendance() {
  return (
    <div className="container mx-auto">
      {/* Registered Attendees Section */}
      <section className="mb-6">
      
        <EventAttendance />
      </section>

      {/* Divider */}
      <hr className="border-t-2 border-gray-300 w-full md:w-3/4 mx-auto my-6" />

      {/* Unregistered Attendees Section */}
      <section>
       
        <EventUnregisteredAttendace />
      </section>
    </div>
  );
}

export default Attendance;
