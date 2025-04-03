const handleCall = (mobile) => {
  window.open(`tel:${mobile}`);
};

const About = () => {
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
      {/* About App Section */}
      <section className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">About App</h2>
        <p>
          Balmandal is a weekly gathering organized every Tuesday at Yogi Sabhagruh, Akshar
          Purushottam Chhatralay, Vallabh Vidyanagar. This Sabha is specially designed to nurture
          spiritual, cultural, and moral values among children. The 90-minute session helps children
          build a strong foundation of life lessons, devotion, and discipline through various
          engaging activities.
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>
            <strong>Spiritual Talks:</strong> Understanding teachings of Supreme Lord Shree
            Swaminarayan
          </li>
          <li>
            <strong>Moral Stories:</strong> Inspiring positive values
          </li>
          <li>
            <strong>Interactive Games:</strong> Life lessons through engaging activities
          </li>
          <li>
            <strong>Devotional Activities:</strong> Prayers, bhajans, and meditation
          </li>
          <li>
            <strong>Holy Meal (Prasad):</strong> Served with love by the organization
          </li>
        </ul>
        <p className="mt-4 font-semibold">
          Our mission is to shape the future generation with good character, devotion, and cultural
          values.
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            🔔 <strong>Weekly Sabha Reminders:</strong> Notifications for Sabha
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            📢 <strong>Event Updates:</strong> Stay informed about upcoming events
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            📄 <strong>Child’s Profile Management:</strong> Manage child & parent details
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            🏅 <strong>Achievements Section:</strong> Showcase talents & contributions
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            🎯 <strong>Attendance System:</strong> Track weekly attendance
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            🌟 <strong>Talent Section:</strong> Highlight children’s skills
          </div>
        </div>
        <h3 className="mt-6 text-xl font-bold text-blue-600">🎯 Our Vision 🎯</h3>
        <p>
          This app bridges the gap between Balmandal volunteers, children, and parents, making
          communication easier and more effective. It not only helps in managing Sabha activities
          but also motivates children to actively participate and grow spiritually. Together, let's
          build a virtuous and devoted generation!
        </p>
        <p className="mt-4 text-center text-lg font-semibold">🙏 Jay Swaminarayan 🙏</p>
      </section>

      {/* About Volunteers Section */}
      <section className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">About Volunteers</h2>
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

      {/* About BAPS Section */}
      <section className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">About BAPS</h2>
        <p>
          Bochasanwasi Shri Akshar Purushottam Swaminarayan Sanstha (BAPS) is a global Hindu
          socio-spiritual organization dedicated to fostering spirituality, values, and social
          service. Founded in 1907 by Shastriji Maharaj, BAPS follows the Akshar-Purushottam Darshan
          as revealed by Bhagwan Swaminarayan.
        </p>
        <h3 className="mt-4 text-xl font-bold">Our Mission</h3>
        <p>
          BAPS aims to preserve spirituality, strengthen family values, and serve humanity through
          temples, discourses, youth and children's activities, and humanitarian projects.
        </p>
        <h3 className="mt-4 text-xl font-bold">Our Work</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Spiritual Growth:</strong> 1,200+ temples worldwide promoting devotion & culture
          </li>
          <li>
            <strong>Community Service:</strong> Education, healthcare, disaster relief, and
            environmental initiatives
          </li>
          <li>
            <strong>Youth & Children’s Development:</strong> Bal & Yuvak Mandals instilling values &
            leadership
          </li>
        </ul>
        <h3 className="mt-4 text-xl font-bold">Leadership & Inspiration</h3>
        <p>
          Guided by HH Mahant Swami Maharaj, BAPS continues to uphold the vision of Pramukh Swami
          Maharaj, Yogiji Maharaj, and Shastriji Maharaj.
        </p>
        <p className="mt-4 italic">“In the joy of others lies our own.” – Pramukh Swami Maharaj</p>
        <p className="mt-4 text-center">
          <a href="https://www.baps.org" className="text-blue-500 underline">
            Visit www.baps.org for more information
          </a>
        </p>
      </section>
    </div>
  );
};

export default About;
