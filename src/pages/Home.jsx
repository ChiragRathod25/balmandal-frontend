import React from 'react';
import { useSelector } from 'react-redux';
import { Button,ImageCarousel } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

function Home() {
  const authStatus = useSelector((store) => store.auth.status);
  const isAdmin = useSelector((store) => store.auth.userData?.isAdmin);
  const navigate = useNavigate();
  // get images stored in public/home/assets/imageCarousel folder
  
  const images = [
    '/imageCarousel/1.webp',
    '/imageCarousel/2.webp',
    '/imageCarousel/3.webp',
    '/imageCarousel/4.webp', 
    '/imageCarousel/5.webp',
    '/imageCarousel/6.webp',
    '/imageCarousel/7.webp',
    '/imageCarousel/8.webp',
    '/imageCarousel/9.webp', 
    '/imageCarousel/10.webp',
    '/imageCarousel/11.webp',
    '/imageCarousel/12.webp',
    '/imageCarousel/13.webp',
    '/imageCarousel/14.webp',
    '/imageCarousel/15.webp',
    '/imageCarousel/16.webp',
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Image Carousel */}
      <div className="w-full max-w-lg mx-auto mb-6 rounded-lg shadow-lg overflow-hidden">
        <ImageCarousel
          
          images={images}
          mode="fade"
        />
      </div>

      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center text-center py-16 px-6 bg-gradient-to-b from-blue-200 to-gray-100 border-none">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight relative z-10">
          Welcome to <br className="sm:hidden" />
          <span className="text-blue-600">APC Bal Mandal</span>
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-gray-700 max-w-2xl relative z-10">
          Nurturing values, fostering talents, and building a brighter future.
        </p>
      </div>

      {/* Authentication Actions */}
      {/* {!authStatus ? (
        <div className="flex flex-row justify-around w-full max-w-md mb-6">
          <Button onClick={() => navigate('/login')} className="w-32 sm:w-36 md:w-40 text-center">
            Login
          </Button>
          <Button
            onClick={() => navigate('/register')}
            className="w-32 sm:w-36 md:w-40 text-center"
          >
            Register
          </Button>
        </div>
      ) : null} */}

      {/* Feature Sections */}
      {
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl" id='features'>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Balak Profile</h3>
            <p className="mt-2 text-gray-600">
              {/* Explore and manage your profile with personal details. */}
              Manage and view Balak details to better understand and guide their journey.
            </p>
            {authStatus && (
              <Button
                onClick={() => navigate('/profile')}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                View Profile
              </Button>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Parental Information</h3>
            <p className="mt-2 text-gray-600">
              {/* Stay connected with parents to ensure the best support and guidance. */}
              Keep track of parents' contact details for seamless communication and support.
            </p>
            {authStatus && (
              <Button
                onClick={() => navigate('/parent')}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
              >
                View Parents
              </Button>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Achievements</h3>
            <p className="mt-2 text-gray-600">
              Celebrate and showcase the skills, awards, and spiritual growth of Balak.
            </p>
            {authStatus && (
              <Button
                onClick={() => navigate('/achievement')}
                className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
              >
                View Achievements
              </Button>
            )}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-700">Talents</h3>
            <p className="mt-2 text-gray-600">
              {/* recognize   Showcase the unique skills and talents . */}
              Recognize and showcase the unique skills and talents of Balak.
            </p>
            {authStatus && (
              <Button
                onClick={() => navigate('/talent')}
                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                View Talents
              </Button>
            )}
          </div>
        </div>
      }

      {/* Admin Dashboard Access */}
      {isAdmin && authStatus && (
        <div className="mt-10">
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md text-lg"
          >
            Go to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
