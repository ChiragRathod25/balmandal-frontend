import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Button } from '../../index.js'
import databaseService from '../../../services/database.services.js'


function UpdateUsernameForm({handleUpdateUserName,isUsedWithModal = false, closeForm, userId}) {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = async (data) => {
    //confirm
    if (!window.confirm('Are you sure want to update username?')) {
      return;
    }

    try {
      await databaseService.updateUsername(data, userId);
      if (isUsedWithModal) {
        handleUpdateUserName(data.username, userId);
        closeForm();
        return;
      }
    } catch (error) {
      console.error('Error updating user username:', error);
      setError(error.message);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        type="text"
        label="Username"
        placeholder="Enter your username"
        {...register('username', { required: true })}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit">Update Username</Button>
    </form>
  )

}

export default UpdateUsernameForm