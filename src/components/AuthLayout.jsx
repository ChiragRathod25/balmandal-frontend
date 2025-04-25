import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import log from '../utils/logger.js';
import {LoadingComponent} from './index.js';

function AuthLayout({ children, authentication = true }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication === false) {
      log.debug('Authentication is not required!');
    } else if (authentication && authStatus !== authentication) {
      navigate('/login');
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  if (loading) {
    return <LoadingComponent customLoadingMsg={`Verifying user...`} />;
  }

  return (
    <div className="min-h-screen bg-gray-100  ">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-1  sm:mt-8">{children}</div>
    </div>
  );
}

export default AuthLayout;
