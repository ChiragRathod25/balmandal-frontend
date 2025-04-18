import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button } from '../../components';
import databaseService from '../../services/database.services';

function ResetPassword() {
  const { resetToken } = useParams();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (data) => {
    setLoading(true);
    setError(null);
    if (data.password !== data.confirmPassword) {
      setError('Password and confirm password do not match.');
      setLoading(false);
      return;
    }
    databaseService
      .resetPassword(data, resetToken)
      .then((response)=>{
  
        if(response.statusCode === 200){
          alert('Password reset successfully!');
          navigate('/login');
        }
      })
      .catch((error) => {
        setError('Failed to reset password. Please try again.\n' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return resetToken ? (
    <>
      <div className="flex items-center justify-center items-start min-h-screen bg-gray-100 p-4 py-16">
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...register('password', { required: true })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              {...register('confirmPassword', { required: true })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Button
              type="submit"
              className="w-full py-2 mt-4 text-white rounded-md hover:bg-blue-600"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center items-start min-h-screen bg-gray-100 p-4 py-16">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <p className="text-center">Invalid or expired reset token.</p>
      </div>
    </div>
  );
}

export default ResetPassword;
