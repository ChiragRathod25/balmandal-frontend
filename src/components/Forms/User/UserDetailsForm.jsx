import { useNavigate } from 'react-router-dom';
import databaseService from '../../../services/database.services';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Select } from '../..';
import { updateUser } from '../../../slices/userSlice/authSlice';
function UserDetailsForm({ user, setEditing, handleUserDetailsEditing }) {
  
  const navigate = useNavigate();
  const userId = useSelector((state) => state.dashboard.editableUser?._id);
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const adminUserId = useSelector((state) => state.auth.userData._id);
  const dispatch=useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      middleName: user.middleName || '',
      email: user.email || '',
      mobile: user.mobile || '',
      DOB: new Date(user.DOB).toISOString().split('T')[0] || '',
      school: user.school || '',
      std: user.std || '',
      mediumOfStudy: user.mediumOfStudy || '',
    },
  });
  
  const submit = async (data) => {

    if (isAdmin && userId) {
      const response = await databaseService
        .updateUserDetails(data, userId)
        .then((response) => response.data)
        .then((response) => {
          handleUserDetailsEditing(response);
          return response;
        })
        .catch((error) => console.error('error while updating user details', error));
      if (response) {
        setEditing(false);
        navigate(`/dashboard/user/${userId}`);
      }
    } else {
      const response = await databaseService
        .updateUserDetails(data)
        .then((response) => response.data)
        .then((data)=>dispatch(updateUser(data)))
        .catch((error) => console.error('error while updating user details', error));
      if (response) {
        setEditing(false);
        navigate(`/profile`);
      }
    }
  };

  const handleCancel = () => {
    if (isAdmin && userId  && adminUserId !== user?._id) {
      setEditing(false);
      navigate(`/dashboard/user/${userId}`);
    } else {
      setEditing(false);
      navigate(`/profile`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <Input
          label="First Name"
          placeholder="First Name"
          className="w-full"
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          className="w-full"
          {...register('lastName')}
        />
        <Input
          label="Middle Name"
          placeholder="Middle Name"
          className="w-full"
          {...register('middleName')}
        />
        <Input label="Email" placeholder="Email" className="w-full" {...register('email')} />
        <Input label="Mobile" placeholder="Mobile" className="w-full" {...register('mobile')} />
        <Input type="date" label="DOB" placeholder="DOB" className="w-full" {...register('DOB')} />
        <div className="flex justify-center w-full max-w-md mx-auto gap-4">
          <Select
            label="Std"
            options={['Pre School', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
            className="w-full"
            {...register('std')}
          />

          <Select
            label="Medium Of Study"
            options={['Hindi', 'Gujarati', 'English', 'Marathi']}
            className="w-full"
            {...register('mediumOfStudy')}
          />
        </div>

        <Input label="School" placeholder="School" className="w-full" {...register('school')} />

        <div className="flex justify-between p-4">
          <Button type="submit">Update</Button>
          <Button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserDetailsForm;
