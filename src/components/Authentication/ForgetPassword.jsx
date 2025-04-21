import React from 'react';
import { useForm } from 'react-hook-form';
import databaseService from '../../services/database.services.js';
import { useNavigate,Link } from 'react-router-dom';
import { Input, Button } from '../../components/index.js';

function ForgetPassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const submit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await databaseService.forgetPassword(data).then((response) => response.data);
      if (response) {
        alert('Reset link sent to your registered email');
        navigate('/login');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  };
  return (
    <div className="flex items-center justify-center items-start min-h-screen bg-gray-100 p-4 py-16">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Forget Password</h2>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            {...register('username', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-blue-500">Sending reset link...</p>}

          <Button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Send Reset Link
          </Button>
        </form>
        <p className="text-center ">
          Remembered your password?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>

    </div>
  );
}

export default ForgetPassword;
