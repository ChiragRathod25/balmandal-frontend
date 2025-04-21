import React from 'react';
import { Input, Button, Select } from '../../../index.js';
import databaseService from '../../../../services/database.services.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function UnregisteredAttendanceForm({ UnregisteredAttendance }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: UnregisteredAttendance?.fullName || '',
      mobile: UnregisteredAttendance?.mobile || '',
      email: UnregisteredAttendance?.email || '',
      remark: UnregisteredAttendance?.remark || '',
      status: UnregisteredAttendance?.status || 'present',
    },
  });

  const { eventId } = useParams();
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const response = UnregisteredAttendance
        ? await databaseService.updateUnregisteredAttendance(data, UnregisteredAttendance._id)
        : await databaseService.addUnregisteredAttendance(data, eventId);

      if (response) {
        navigate(`/event/attendance/${eventId || UnregisteredAttendance.eventId}`);
      }
    } catch (error) {
      console.error('Error saving unregistered attendance', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter full name"
        {...register('fullName', { required: true })}
        className="w-full"
      />

      <Input
        label="Mobile"
        type="text"
        placeholder="Enter mobile number"
        {...register('mobile')}
        className="w-full"
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        {...register('email')}
        className="w-full"
      />

      <Input
        label="Remark"
        type="text"
        placeholder="Enter remark"
        {...register('remark')}
        className="w-full"
      />

      <Select
        label="Status"
        options={['present', 'absent']}
        {...register('status', { required: true })}
        className="w-full"
      />

      <div className="flex gap-4 mt-4">
        <Button type="submit">Submit</Button>
        <Button
          type="button"
          onClick={() => navigate(`/event/attendance/${eventId || UnregisteredAttendance.eventId}`)}
          className="bg-gray-500 text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default UnregisteredAttendanceForm;
