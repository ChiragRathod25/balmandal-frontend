import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import databaseService from '../../../services/database.services';
import { Button, Input, FileUploader, CloudFilesManager, Select } from '../../';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEditableUserTalent } from '../../../slices/dashboard/dashboardSlice';
import log from '../../../utils/logger.js';

function TalentForm({ talent, closeForm, isUsedWithModal = false }) {
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.dashboard.editableUser?._id);

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      heading: talent?.heading || '',
      description: talent?.description || '',
      image: null,
      talentType: talent?.talentType || 'Singing', // default value
    },
  });

  const navigate = useNavigate();

  const [cloudFiles, setCloudFiles] = React.useState(talent?.images || []);

  useEffect(() => {
    log.debug('Rerendering for cloudFiles file manager', cloudFiles);
    setFinalCloudFiles(cloudFiles);
  }, [cloudFiles]);

  const talents = useSelector((state) => state.dashboard.editableUserTalent);
  const updateStoreTalents = (newTalent) => {
    let updatedTalents;
    if (talent) {
      updatedTalents = talents.map((talent) => (talent._id === newTalent._id ? newTalent : talent));
    } else {
      updatedTalents = [...talents, newTalent];
    }
    dispatch(setEditableUserTalent(updatedTalents));
  };

  let FinalCloudFiles = cloudFiles;
  const submit = async (data) => {
    data['cloudFiles'] = JSON.stringify(FinalCloudFiles);

    if (isAdmin && userId) {
      if (talent) {
        const response = await databaseService
          .updateTalent(data, talent?._id, userId)
          .then((response) => response.data);
        if (response) {
          updateStoreTalents(response);
          if (isUsedWithModal) {
            closeForm();
            return;
          }
          navigate(`/dashboard/user/${userId}`);
        }
      } else {
        const response = await databaseService
          .addTalent(data, userId)
          .then((response) => response.data);

        if (response) {
          updateStoreTalents(response);
          if (isUsedWithModal) {
            closeForm();
            return;
          }

          navigate(`/dashboard/user/${userId}`);
        }
      }
    } else {
      if (talent) {
        console.log('Talent data', data);
        const response = await databaseService
          .updateTalent(data, talent?._id)
          .then((response) => response.data);
        if (response) {
          navigate(`/talent/${response._id}`);
        }
      } else {
        const response = await databaseService.addTalent(data).then((response) => response.data);
        if (response) navigate(`/talent/${response._id}`);
      }
    }
  };

  const handleCancel = () => {
    if (isAdmin && userId) {
      if (isUsedWithModal) {
        closeForm();
        return;
      }
      navigate(`/dashboard/user/${userId}`);
    } else {
      navigate(`/talent`);
    }
  };

  const setFinalCloudFiles = (nf) => {
    FinalCloudFiles = nf;
  };
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
          label="Heading: "
          placeholder="Enter talent "
          {...register('heading', { required: true })}
          className="w-full"
        />
        <Select
          label="Talent Type: "
          options={[
            'Singing',
            'Dancing',
            'Acting',
            'Comedy',
            'Magic',
            'Drawing',
            'Painting',
            'Writing',
            'Elocution',
            'Photography',
            'Cooking',
            'Sports',
            'Instrumental Music',
            'Craft Work',
            'Storytelling',
            'Mimicry',
            'Debate',
            'Quiz',
            'Science Experiments',
            'Other',
          ]}
          {...register('talentType', { required: true })}
          className="w-full"
        />

        <Input
          label="Description: "
          type="textarea"
          rows={5}
          placeholder="Describe talent "
          {...register('description')}
          className="w-full"
        />

        {cloudFiles && cloudFiles.length > 0 && (
          <CloudFilesManager
            cloudFiles={cloudFiles}
            setCloudFiles={setCloudFiles}
            handleDeleteFile={handleDeleteFile}
          />
        )}
        <FileUploader
          register={register}
          name="image"
          accept="image/png, image/jpg, image/jpeg, image/gif, video/mp4, video/mkv, video/avi"
          watch={watch}
          className="w-full"
        />

        <div className="flex space-x-4">
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {talent ? 'Update' : 'Add'}
          </Button>
          <Button
            type="button"
            onClick={() => handleCancel()}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TalentForm;
