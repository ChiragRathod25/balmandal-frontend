import React, { useCallback, useEffect, useState } from 'react';
import { Button, ErrorComponent, LoadingComponent, Select } from '../../components/index.js';
import databaseService from '../../services/database.services.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../../slices/dashboard/dashboardSlice.js';
import { FaBirthdayCake } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";


function BirthdayDetails() {
  const fetchAllActiveUsers = useCallback(() => databaseService.fetchAllActiveUsers(), []);
  const { data: allUsers, loading, error } = useCustomReactQuery(fetchAllActiveUsers);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (allUsers) {
      dispatch(setAllUsers(allUsers));
    }
  }, [allUsers]);

  // select the range of dates for the birthday filter from the input field
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7)).getDate()
  ); // Initialize with current date - 7 days

  const [endDate, setEndDate] = useState(new Date().getDate()); // Initialize with current date

  const [startMonth, setStartMonth] = useState(new Date().getMonth() + 1); //current month
  const [endMonth, setEndMonth] = useState(new Date().getMonth() + 1); //current month

  const handleDateFilter = () => {
    // select the users of the given month and date range
    const filteredUsers = allUsers.filter((user) => {
      const userDate = new Date(user.DOB);
      const userDay = userDate.getDate();
      const userMonth = userDate.getMonth() + 1; // Months are zero-based in JavaScript


      if (!userDay || !userMonth) {
        return false; // Skip users with invalid DOB
      }
      const isInRange =
        userDay >= startDate &&
        userDay <= endDate &&
        userMonth >= startMonth &&
        userMonth <= endMonth;
      return isInRange;
    });

    // set the filtered users to the state
    setFilteredUsers(filteredUsers);
  };

  if (loading) {
    return (
      <LoadingComponent/>
    );
  }
  if (error) {
   return <ErrorComponent errorMsg={error} />;
  }

  return (
    <>
      {/* Title */}
      <div className="text-center mb-4 px-4">
        <h2 className="text-3xl font-bold tracking-tight text-blue-700 pt-4">
          <span className="inline-flex items-center gap-2 justify-center">
            <FaBirthdayCake className="text-pink-500 text-2xl" />
            Birthdays
          </span>
        </h2>
      </div>
  
      {/* Main Grid */}
      <div className="
        grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12 bg-gray-50 rounded-lg shadow-md mx-auto max-w-screen-xl "      >
        {/* Filter Section */}
        <div className="flex flex-col gap-2 p-6 rounded-2xl shadow-sm ">
          <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <IoCalendarOutline className="text-blue-500 text-2xl" />
            Filter by Date
          </h3>
        <div
          className="grid grid-cols-2 gap-4"
        >
          <Select
            label="Start Month"
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onChange={(e) => setStartMonth(e.target.value)}
            value={startMonth}
            />
          <Select
            label="End Month"
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            onChange={(e) => setEndMonth(e.target.value)}
            value={endMonth}
            />
            </div>
            <div
          className="grid grid-cols-2 gap-4"
            >

          <Select
            label="Start Date"
            options={[...Array(31).keys()].map((i) => i + 1)}
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            />
          <Select
            label="End Date"
            options={[...Array(31).keys()].map((i) => i + 1)}
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            />
            </div>
  
          <Button
            onClick={handleDateFilter}
            className="text-white px-4 py-2 rounded-lg shadow-md transition mt-4"            
          >
            Search
          </Button>
        </div>
  
        {/* Results Section */}
        <div className="lg:col-span-2">
          {filteredUsers && filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FaBirthdayCake className="text-pink-500 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    🎂 Birthday: {user.DOB?.split("T")[0]}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-6">No users found</div>
          )}
        </div>
      </div>
    </>
  );
  
}

export default BirthdayDetails;
