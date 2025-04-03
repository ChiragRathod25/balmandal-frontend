import { useCallback, useEffect, useState } from 'react';
import databaseService from '../../services/database.services';
import { useSelector } from 'react-redux';
import { Button, UserAchievementCard } from '../../components';
import { useNavigate } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { QueryHandler } from '../../components';

function AllAchievement() {
  const [achievements, setAchievements] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData?.firstName);

  // Fetch achievements data
  const fetchAchievements = useCallback(() => databaseService.getUserAchievements(), []);
  const { data, error, loading } = useCustomReactQuery(fetchAchievements);
  useEffect(() => {
    if (data) {
      setAchievements(data);
    }
  }, [data]);

  return (
    <QueryHandler queries={[{ loading, error }]}>      
      <div className="container mx-auto p-4">
        {Array.isArray(achievements) && achievements.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">{`${user}'s Achievements`}</h2>
            <div
              className="w-full
          
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4
            "
            >
              {achievements.map((achievement) => (
                <UserAchievementCard key={achievement?._id} achievement={achievement} />
              ))}
            </div>
          </>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/achievement/add')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Add Achievement
          </Button>
        </div>
      </div>
    </QueryHandler>
  );
}

export default AllAchievement;
