import React from 'react';
import { Input, Button } from '../../components';
import { get, useForm } from 'react-hook-form';
import databaseService from '../../services/database.services';
import { useNavigate } from 'react-router-dom';

function AddRegisteredUser() {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
    const navigate=useNavigate()

  const submit = async (data) => {
     
    setLoading(true);
    setError(null);
    try{
        const response=await databaseService.register(data)
       
        if(response.statusCode===200){
            navigate('/dashboard')
        }


    }catch(err){
      
        setError(err.message);
    }
    setLoading(false);


  };

  const generateUsername = (firstName) => {
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${firstName?.trim()?.toLowerCase()}${randomNumber}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 py-16">
        <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center items-start min-h-screen  p-4 ">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Add Register User</h2>
        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* username, email,firstName, lastName, mobile, password */}
          <Input
            label="First name : "
            placeholder="Enter your first name"
            {...register('firstName', { required: true })}
            className="mb-4"
          />
          <Input
            label="Last name : "
            placeholder="Enter your last name"
            {...register('lastName', { required: true })}
            className="mb-4"
          />
          <div 
          className="text-sm text-blue-500 cursor-pointer "
            onClick={() => {
                setValue('mobile', '0000000000')
            }}
            >
            Doesn't have mobile number
            </div>

          <Input
            type="tel"
            label="Mobile Number"
            placeholder="Enter your mobile number"
            {...register('mobile', { required: true,minLength: 10, maxLength: 10 })}
            className="mb-4"
          />
           <div
            className="text-sm text-blue-500 cursor-pointer"
            onClick={() => {
              const generatedUsername = generateUsername(getValues('firstName'));
              setValue('username', generatedUsername);
              setValue('email', `${generatedUsername}@example.com`);
              setValue('password', `${generatedUsername}${Math.floor(Math.random() * 10000)}`);
            setValue('confirmPassword', getValues('password'));
            }}
          >
          Generate Auth Details
            </div>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register('email', { required: true })}
            className="mb-4"
          />
          
          <Input
            type="text"
            label="Username"
            placeholder="Enter username (New)"
            {...register('username', { required: true })}
            className="mb-4"
          />
         
          <Input
            type="password"
            label="Password"
            placeholder="Enter password (New)"
            {...register('password', { required: true })}
            className="mb-4"
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            className="mb-4"
            {...register('confirmPassword', { required: true })}
          />
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          <Button type="Submit" className="w-full mt-4">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddRegisteredUser;
