import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../../index.js';
import databaseService from '../../../services/database.services.js';

function UpdatePasswordForm({ isUsedWithModal = false, closeForm, userId }) {
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    //confirm
    if (!window.confirm('Are you sure want to update password?')) {
      return;
    }

    try {
      await databaseService.updateUserPassword(data, userId);
      if (isUsedWithModal) {
        closeForm();
        return
      }
    } catch (error) {
      console.error('Error updating user password:', error);
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        {...register('password', { required: true })}
      />
      <Input
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        {...register('confirmPassword', { required: true })}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Update Password</Button>
    </form>
  );
}

export default UpdatePasswordForm;
