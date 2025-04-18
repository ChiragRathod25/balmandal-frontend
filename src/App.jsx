import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import databaseService from './services/database.services';
import { useDispatch } from 'react-redux';
import { login, logout } from './slices/userSlice/authSlice';
import useScrollToTop from './utils/useScrollToTop';
import MyToaster from './MyToaster';
import { registerAndSubscribe, regSw } from './utils/subscriptionHelper';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Layout } from './components';
import { setDeferredPrompt } from './utils/installPromptStore';

//App Component
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useScrollToTop();

  useEffect(() => {

    // set defferredPrompt status for InstallApp component
    const handleBeforeInstallPrompt = (e) => {
      console.log('Before Install Deferred Prompt:', e);
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
