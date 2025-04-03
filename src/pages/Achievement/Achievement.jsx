import  { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { Button } from '../../components';
import { QueryHandler } from '../../components';
import useCustomeReactQuery from '../../utils/useCustomReactQuery';
import { FilesDisplayHelper } from '../../components';

function Achievement({ id ,isUsedWithModal=false}) {
  // here id is a achievementId passed from the admin page to get the achievement details without using the useParams hook
  // hook is used to get the achievementId from the url by the regular user
  const achievementId = useParams().achievementId || id;

  const navigate = useNavigate();

  // Fetch achievement data
  const fetchAchievement = useCallback(
    () => databaseService.getAchievementById({ achievementId }),
    [achievementId]
  );
  const { data:achievement, loading, error } = useCustomeReactQuery(fetchAchievement);

  useEffect(() => {
    if (!achievementId && !isUsedWithModal) {
      navigate('/');
      return;
    }
  }, [ achievementId, navigate]);

  // Handle delete action
  const handleDelete = async (achievementId) => {
    if (!confirm('Are you sure you want to delete this Achievement?')) {
      return;
    }
    try {
      const response = await databaseService
        .deleteAchievement({ achievementId })
        .then((response) => response.data);

      if (response) {
        navigate('/achievement');
      }
    } catch (error) {
      console.error('Error Deleting Achievement:', error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {achievement ? (
        <div className="max-w-5xl mx-auto ">
          <div className="bg-white shadow-lg rounded-xl p-6">
            {/* Achievement Title */}
            <h3 className="text-2xl font-semibold mb-4 text-center sm:text-left">
              {achievement.title}
            </h3>
            <hr className="mb-4 border-gray-300" />

            {/* Achievement Description */}
            <p className="text-gray-700 text-sm sm:text-base mb-4 whitespace-pre-wrap">
              {achievement.description}
            </p>

            {/* Achievement Image */}
            <FilesDisplayHelper cloudFiles={achievement?.media} />

            {/* Action Buttons */}
            {/* display buttons if it is called as a page by the regular user, 
            if the isUsedWithModal is true it means that component is being called from the admin dashboard , 
            in that case dashboard will provide btn with contentBody of the Modal */}
            {!isUsedWithModal && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
                <Button
                  onClick={() => navigate(`/achievement/edit/${achievement._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Edit Achievement
                </Button>
                <Button
                  onClick={() => handleDelete(achievement?._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Delete Achievement
                </Button>
                <Button
                  onClick={() => navigate('/achievement')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Manage Achievements
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </QueryHandler>
  );
}

export default Achievement;
