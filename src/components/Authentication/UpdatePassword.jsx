import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Button } from '../../components/index.js';
import databaseService from '../../services/database.services.js';

function UpdatePassword() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (data) => {

    setLoading(true);
    setError(null);
    if (data.newPassword !== data.confirmPassword) {
      setError('Password and confirm password do not match.');
      setLoading(false);
      return;
    }
    databaseService
      .updatePassword(data)
      .then((response) => {
        if (response.statusCode === 200) {
          alert('Password updated successfully!');
          navigate('/profile');
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center items-start min-h-screen bg-gray-100 p-4 py-16">
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Update Password</h2>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <Input
              label="Old Password"
              type="password"
              placeholder="Enter your old password"
              {...register('oldPassword', { required: true })}
              className="w-full px-4 py-2 border rounded-md"
            />

            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              {...register('newPassword', { required: true })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your new password"
              {...register('confirmPassword', { required: true })}
              className="w-full px-4 py-2 border rounded-md"
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full py-2 mt-4 text-white rounded-md hover:bg-blue-600"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;
