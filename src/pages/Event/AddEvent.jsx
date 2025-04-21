import { EventForm, Container } from '../../components/index.js';

function AddEvent() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <Container>
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Event
        </h2>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <EventForm />
        </div>
      </Container>
    </div>
  );
}

export default AddEvent;