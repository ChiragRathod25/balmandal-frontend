import  { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services.js';
import { AchievementForm,QueryHandler} from '../../components/index.js';
import useCustomeReactQuery from '../../utils/useCustomReactQuery.js';

function EditAchievement() {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const navigate = useNavigate();

  // Fetch achievement details
  const fetchAchievement = useCallback(
    () => databaseService.getAchievementById({ achievementId }),
    [achievementId]
  );

  const { data, loading, error } = useCustomeReactQuery(fetchAchievement);

  useEffect(() => {
    if (!achievementId) {
      navigate('/');
      return;
    }
    if (data) {
      setAchievement(data);
    }
  }, [achievementId, data, navigate]);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {achievement ? (
       
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Edit Achievement
              </h2>
              <AchievementForm achievement={achievement} />
            </div>
       
      ) : null}
    </QueryHandler>
  );
}

export default EditAchievement;
