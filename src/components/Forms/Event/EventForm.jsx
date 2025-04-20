import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button, FileUploader, CloudFilesManager, Select } from '../../index';
import databaseService from '../../../services/database.services';
import { useNavigate } from 'react-router-dom';

function EventForm({ event }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      startAt: event?.startAt || '',
      endAt: event?.endAt || '',
      venue: event?.venue || '',
      eventType: event?.eventType || '',
      media: null,
      status: event?.status || 'upcoming',
    },
  });

  function formatToLocalDatetimeInput(utcDateString) {
    if (!utcDateString) return '';
    const date = new Date(utcDateString);

    // Get local offset-adjusted values
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  useEffect(() => {
    if (event) {
      const newStartAt = formatToLocalDatetimeInput(event?.startAt) || '';
      const newEndAt = formatToLocalDatetimeInput(event?.endAt) || '';
      setValue('startAt', newStartAt);
      setValue('endAt', newEndAt);
    }
  }, [event, setValue]);

  const startAd = watch('startAt');
  const endAd = watch('endAt');

  useEffect(() => {
    if (startAd && endAd && startAd > endAd) {
      alert('Start Date should be less than End Date');
      setValue('endAt', '');
    }
  }, [startAd, endAd, setValue]);

  const navigate = useNavigate();
  const [cloudFiles, setCloudFiles] = React.useState(event?.media || []);
  let FinalCloudFiles = cloudFiles;

  const submit = async (data) => {
    data['cloudMediaFiles'] = JSON.stringify(FinalCloudFiles);
   
    if (event) {
      const response = await databaseService.updateEvent(data, event._id).then((res) => res.data);
     
      if (response) navigate(`/event/${event?._id}`);
    } else {
      const response = await databaseService.addEvent(data).then((res) => res.data);
      if (response) navigate(`/event/${response?._id}`);
    }
  };

  const handleCancel = () => navigate(`/event`);

  const setFinalCloudFiles = (files) => (FinalCloudFiles = files);

  const handleDeleteFile = async (index) => {
    const url = cloudFiles[index];
    await databaseService.deleteFile({ deleteUrl: url }).then(() => {
      setCloudFiles((prev) => prev.filter((img, i) => i !== index));
    });
    const newFiles = cloudFiles.filter((img, i) => i !== index);
    setFinalCloudFiles(newFiles);
    handleSubmit(submit)();
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Input
          label="Title"
          name="title"
          placeholder="Enter title"
          {...register('title', { required: true })}
          className="w-full"
        />

        <Input
          label="Description: "
          name="description"
          placeholder="Description about Event"
          {...register('description')}
          type="textarea"
          className="w-full"
          rows={5}
        />

        <Input
          label="Venue"
          name="venue"
          placeholder="Enter venue"
          {...register('venue', { required: true })}
          className="w-full"
        />
        <Select
          label="Event Type"
          name="eventType"
          {...register('eventType', { required: true })}
          options={['Bal Sabha', 'Satsang Diksha', 'Samuh Puja', 'Other']}
          className="w-full"
        />
        <Select
          label="Status"
          name="status"
          {...register('status', { required: true })}
          options={['upcoming', 'ongoing', 'completed', 'cancelled']}
          className="w-full"
        />
        <Input
          type="datetime-local"
          label="Start Date"
          name="startAt"
          {...register('startAt', { required: true })}
          className="w-full"
        />

        <Input
          type="datetime-local"
          label="End Date"
          name="endAt"
          {...register('endAt', { required: true })}
          className="w-full"
        />

        {cloudFiles && cloudFiles.length > 0 && (
          <CloudFilesManager
            cloudFiles={cloudFiles}
            setCloudFiles={setFinalCloudFiles}
            handleDeleteFile={handleDeleteFile}
          />
        )}

        <FileUploader
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          register={register}
          name="media"
          watch={watch}
          className="w-full"
        />

        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {event ? 'Update' : 'Create'}
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
