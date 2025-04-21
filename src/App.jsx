import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import databaseService from './services/database.services.js';
import { useDispatch } from 'react-redux';
import { login, logout } from './slices/userSlice/authSlice.js';
import useScrollToTop from './utils/useScrollToTop.js';
import MyToaster from './MyToaster.jsx';
import { registerAndSubscribe } from './utils/subscriptionHelper.js';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Layout } from './components/index.js';
import { setDeferredPrompt } from './utils/installPromptStore.js';

//App Component
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useScrollToTop();

  useEffect(() => {

    // set defferredPrompt status for InstallApp component
    const handleBeforeInstallPrompt = (e) => {
      
      e.preventDefault();
      // Store the event so it can be triggered later
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);


  useEffect(() => {
    // Register the service worker and subscribe to push notifications
    registerAndSubscribe();

    const getCurrentUser = async () => {
      await databaseService
        .getCurrentuser()
        .then((response) => {
          if (response.data) {
            dispatch(login(response.data));
            // Check if the user is already subscribed to push notifications
            registerAndSubscribe();
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false));
    };
    getCurrentUser();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <Layout>
        <main>
          {/* <Toaster position="sm:top-right top-center" duration={3000} reverseOrder={false} /> */}
          <MyToaster />

          <Outlet />
        </main>
      </Layout>
      <SpeedInsights />
    </div>
  );
}

export default App;
