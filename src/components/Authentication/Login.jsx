import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '../../components/index.js';
import databaseService from '../../services/database.services.js';
import { login } from '../../slices/userSlice/authSlice.js';
import { registerAndSubscribe } from '../../utils/subscriptionHelper.js';
import log from '../../utils/logger.js';

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatus) navigate('/');
  }, [authStatus, navigate]);

  const submit = async (data) => {
    try {
      const session = await databaseService.login(data);

      if (session) {
        const user = await databaseService.getCurrentuser();

        if (user) {
          dispatch(login(user.data));
          setTimeout(() => {
            log.debug('Registering and subscribing...');  
            registerAndSubscribe();
          }, 10000);
        }
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center items-start min-h-screen bg-gray-100 p-4 py-16">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* <Input
            label="First name : "
            placeholder="Enter your first name"
            {...register('firstName', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Input
            type="tel"
            label="Mobile Number"
            placeholder="Enter your mobile number"
            {...register('mobile', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          /> */}
          <Input
            label="Username"
            placeholder="Enter username"
            {...register('username', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <Input
            type="password"
            label="Password"
            placeholder="Enter password"
            {...register('password', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
          <Button
            type="Submit"
            className="w-full mt-4"
          >
            Login
          </Button>
        </form>
        <div
          className="flex-col items-center justify-between mt-4 gap-4"
        >

        <p className='text-center'>
            Do not remember your password?{' '}
            <Link to="/forgetPassword" className="text-blue-500 hover:underline">
              Forget Password
            </Link>
        </p>
        <p className="text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
