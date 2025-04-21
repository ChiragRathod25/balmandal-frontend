import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import databaseService from '../services/database.services.js';
import { logout } from '../slices/userSlice/authSlice.js';
import toast from 'react-hot-toast';

function Logout() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus) {
      toast.promise(
        databaseService
          .logout()
          .then(() => {
            dispatch(logout());
            navigate('/login');
          })
          .catch((error) => {
            console.error('Logout Error', error);
            toast.error('Error while logging out');
            throw new Error('Error while logging out');
          }),
        {
          loading: 'Logging out',
          success: 'Logged out',
          error: 'Error while logging out',
        },
        {
          id: 'logout',
        }
      );
    } else {
      navigate('/login');
    }
  }, [authStatus, navigate, dispatch]);

  return <>Logging out...</>;
}

export default Logout;
