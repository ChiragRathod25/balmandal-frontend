import  { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services.js';
import { useSelector } from 'react-redux';
import { Button, UserParentCard ,QueryHandler} from '../../components/index.js';
import { useNavigate } from 'react-router-dom';
import useCustomeReactQuery from '../../utils/useCustomReactQuery.js';

function AllParent() {
  const navigate = useNavigate();
  const [parents, setParents] = useState([]);
  const fetchParents = useCallback(() => databaseService.getUserParents(), []);
  const { data, loading, error } = useCustomeReactQuery(fetchParents);

  useEffect(() => {
    if (data) {
      setParents(data);
    }
  }, [data]);

  const user = useSelector((state) => state.auth.userData.firstName);

  const handleAdd = (role) => {
    navigate('/parent/add?role=' + role);
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{`${user}'s Parent Details`}</h2>

        {/* Parent List */}
        {Array.isArray(parents) && parents.length > 0 ? (
          <div className="w-full
          grid grid-cols-1 sm:grid-cols-2 gap-4
          ">
            {parents.map((parent) => (
             <UserParentCard parent={parent} key={parent?._id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No parent details available.</p>
        )}

        {
          parents.length < 2 && 
          parents.filter((parent)=>parent.role ==='Father').length === 0 &&
          <div className="w-full flex justify-center mt-6">
            <Button
              onClick={() => handleAdd('Father')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Add Father
            </Button>
          </div>
        }

        {
          parents.length < 2 &&
          parents.filter((parent)=>parent.role ==='Mother').length === 0 &&
          <div className="w-full flex justify-center mt-6">
            <Button
              onClick={() => handleAdd('Mother')}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Add Mother
            </Button>
          </div>
        }
      </div>
    </QueryHandler>
  );
}

export default AllParent;
