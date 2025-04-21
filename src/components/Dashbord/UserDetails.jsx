import { useState } from 'react';
import { UserDetails as UserDetailsComponent } from '../../pages/index.js';
import { UserDetailsForm } from '../index.js';
import { useSelector,useDispatch } from 'react-redux';
import { setEditableUser } from '../../slices/dashboard/dashboardSlice.js';

const UserDetails = () => {
  const [isEditing, setEditing] = useState(false);
  const user=useSelector((state) => state.dashboard?.editableUser);
  const dispatch = useDispatch();
  
  const handleUserDetailsEditing=(data)=>{
    setEditing(false)
    dispatch(setEditableUser(data))
  }
  return user?(
    <div>
      {isEditing ? (
        <>
          <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <UserDetailsForm user={user} setEditing={setEditing} handleUserDetailsEditing={handleUserDetailsEditing} />
            </div>
          </div>
        </>
      ) : (
        <UserDetailsComponent user={user} setEditing={setEditing} />
      )}
    </div>
  ):null
};

export default UserDetails;
