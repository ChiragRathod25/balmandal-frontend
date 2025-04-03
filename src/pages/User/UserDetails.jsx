import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import databaseService from '../../services/database.services';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { Button, UserAvatar } from '../../components';


function UserDetails({ user,setEditing }) {
  const isAdmin = useSelector((state) => state.auth?.userData?.isAdmin);


  const handleCall = () => {
    window.open(`tel:${user?.mobile}`);
  };
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-10">
        {/* Header Section - Aligned in One Line */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold  ">User Details</h2>
            <p className="text-m text-gray-500 font-semibold">
              <span className="font-semibold  cursor-pointer">@{user?.username} </span>
            </p>
          </div>
          <div className="flex justify-cente align-center">
            <Button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
            >
              Edit
            </Button>
          </div>
        </div>

        {/* User Info Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Avatar Section with More Space */}
          <div className="flex-shrink-0 w-52 h-52 sm:w-64 sm:h-64 flex justify-center sm:scale-[95%] ">
            <UserAvatar avatar={user?.avatar} className="w-full h-full rounded-full shadow-md" />
          </div>

          {/* User Details - Compact Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 w-full">
            <p>
              <span className="font-semibold">First Name:</span> {user?.firstName}
            </p>
            <p>
              <span className="font-semibold">Last Name:</span> {user?.lastName}
            </p>
            <p>
              <span className="font-semibold">Middle Name:</span> {user?.middleName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {user?.mobile}{' '}
              {isAdmin && (
                <span className="text-sm text-gray-500 cursor-pointer" onClick={handleCall}>
                  ( 📞 Call)
                </span>
              )}
            </p>
            <p>
              <span className="font-semibold">DOB:</span> {user?.DOB}
            </p>
            <p>
              <span className="font-semibold">Standard:</span> {user?.std}
            </p>
            <p>
              <span className="font-semibold">Medium of Study:</span> {user?.mediumOfStudy}
            </p>
            <p>
              <span className="font-semibold">School:</span> {user?.school}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
