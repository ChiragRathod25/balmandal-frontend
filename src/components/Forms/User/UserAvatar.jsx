import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../../';
import databaseService from '../../../services/database.services';
import { useSelector } from 'react-redux';

function UserAvatar({ avatar }) {
 
  const userId = useSelector((state) => state.dashboard.editableUser?._id);

  const isAdmin = useSelector((state) => state.auth.userData?.isAdmin);
  
  const { register, handleSubmit, reset, watch } = useForm();
  const [isEditing, setEditing] = useState(false);

  //  `https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png`
  const [avatarUrl, setAvatarUrl] = useState(
    avatar
      ? avatar
      : '/userAvatar.png'
  );

  const avatarWatch = watch('avatar');

  useEffect(() => {
    if (avatar) setAvatarUrl(avatar);
  }, [avatar]);

  useEffect(() => {
    if (!avatarWatch || avatarWatch.length === 0) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(avatarWatch[0]);
  }, [avatarWatch]);

  const handleCancel = () => {
    reset();
    setEditing(false);
    if (avatar) setAvatarUrl(avatar);
  };

  const submit = async (data) => {

    if (isAdmin) {
      databaseService
        .updateAvatar(data, userId)
        .then((response) => response.data)
        .then((data) => {
          reset();
          setEditing(false);
          setAvatarUrl(data.avatar);
        })
        .catch((error) => {
          console.error('Error while updating avatar', error);
        });
    } else {
      databaseService
        .updateAvatar(data)
        .then((response) => response.data)
        .then((data) => {
          reset();
          setEditing(false);
          setAvatarUrl(data.avatar);
        })
        .catch((error) => {
          console.error('Error while updating avatar', error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 ">
      {/* Avatar Image */}
      <img
        src={avatarUrl}
        alt="avatar"
        className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48  rounded-full shadow-lg ${isEditing ? '' : 'sm:scale-[120%] scale-[140%] sm:mb-6 mb-8'}`}
      />

      {/* username */}
      {/* <h2 className="text-xl font-semibold">@{username}</h2> */}

      {/* Change Button */}
      {!isEditing && (
        <Button onClick={() => setEditing(true)} className="w-32 sm:w-40 md:w-48">
          Change
        </Button>
      )}

      {/* Avatar Upload Form */}
      {isEditing && (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center space-y-4">
          <Input type="file" accept="image/*" {...register('avatar', { required: true })} />
          <div className="flex space-x-4">
            <Button type="submit">Upload</Button>
            <Button type="button" onClick={handleCancel} className="bg-gray-400 hover:bg-gray-500">
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UserAvatar;
