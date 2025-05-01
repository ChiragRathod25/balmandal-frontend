const handleCall = (mobile) => {
  window.open(`tel:${mobile}`);
};

const Contact = () => {
  const volunteers = [
    {
      name: 'Vrajeshbhai Vasava',
      role: 'Mandal Nirikshak',
      contact: '+91 9825975070',
    },
    {
      name: 'Siddh Patel',
      role: 'BSC Sanchalak',
      contact: '+91 8866219967',
      education: 'Pursuing Pharamcy',
    },
    {
      name: 'Chirag Rathod',
      role: 'BSC Sah-Sanchalak',
      contact: '+91 9558161280',
      education: 'Pursuing Btech (Computer Science)',
    },
    {
      name: 'Yogi Patel',
      role: 'Shishu Sanchalak',
      contact: '+91 7016997559',
      education: 'Pursuing Btech (Computer Science)',
    },
    {
      name: 'Yuvaraj Inamdar',
      role: 'Shishu Sah-Sanchalak',
      contact: '+91 8141996458',
      education: 'Pursuing Pharamcy',
    },
  ];
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800">

      {/* About Volunteers Section */}
      <section className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4"> Volunteers</h2>
        <p>
          Our dedicated volunteers are the backbone of APC Balmandal, ensuring that every session
          runs smoothly and effectively. They selflessly devote their time and efforts to nurturing
          children with spiritual, moral, and life values.
        </p>
        {volunteers && volunteers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.name}
                className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between"
              >
                <div>
                  {volunteer?.name && (
                    <h3 className="text-xl font-bold text-blue-600">{volunteer.name}</h3>
                  )}
                  {volunteer?.role && <p className="text-lg">{volunteer.role}</p>}
                  {volunteer?.contact && (
                    <>
                    <p className="mt-2">
                      <strong>Contact:</strong> {volunteer.contact}
                  <span
                    className="text-sm text-gray-500 cursor-pointer"
                    onClick={()=>handleCall(volunteer?.contact)}
                    >
                    ( 📞 Call)
                  </span>
                      </p>
                    </>
                  )}


                  {volunteer?.education && (
                    <p>
                      {' '}
                      <strong>Education:</strong> {volunteer.education}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

    </div>
  );
};

export default Contact;
