import { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import { useSelector } from 'react-redux';
import { Button, UserTalentCard } from '../../components';
import { useNavigate } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

function AllTalent() {
  const [talents, setTalents] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData?.firstName);

  // Fetch talents data
  const fetchTalents = useCallback(() => databaseService.getUserTalents(), []);
  const { data, error, loading } = useCustomReactQuery(fetchTalents);

  useEffect(() => {
    if (data) {
      setTalents(data);
    }
  }, [data]);

  // Handle delete action
 
  
  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="container mx-auto p-4">
        {Array.isArray(talents) && talents.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">{`${user}'s Talents`}</h2>
            <div className="w-full
            
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
              {talents.map((talent) => (
              <UserTalentCard talent={talent} key={talent?._id}/>
              ))}
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/talent/add')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Talent
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllTalent;
