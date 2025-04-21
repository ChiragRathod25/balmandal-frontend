import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services.js';
import { Button,QueryHandler,FilesDisplayHelper} from '../../components/index.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';


function Talent({ id, isUsedWithModal = false }) {
  // here id is a talentId passed from the admin page to get the talent details without using the useParams hook
  // hook is used to get the talentId from the url by the regular user
  const talentId = useParams().talentId || id;
  const navigate = useNavigate();

  const fetchTalent = useCallback(() => databaseService.getTalentById({ talentId }), [talentId]);
  const { data: talent, loading, error } = useCustomReactQuery(fetchTalent);

  useEffect(() => {
    if (!talentId && !isUsedWithModal) {
      navigate('/');
      return;
    }
  }, [talentId, navigate]);

  const handleDelete = async (talentId) => {
    if (!window.confirm('Are you sure you want to delete this talent?')) return;

    try {
      await databaseService.deleteTalent({ talentId });
      navigate('/talent');

    } catch (error) {
      console.error('Error Deleting Talent', error);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      {talent ? (
        <div className="container mx-auto p-4">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{talent.heading}</h2>
            <hr className="mb-4 border-gray-300" />
            <div className="whitespace-pre-wrap flex flex-row gap-2">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Talent Type:</p>
              </div>
              <div>
                <p className="text-gray-700">{talent?.talentType}</p>
              </div>
            </div>
            <div className="whitespace-pre-wrap flex flex-row gap-2">
              <div>
                <p className="font-semibold text-gray-800 mb-1">Description:</p>
              </div>
              <div>
                <p className="text-gray-700 text-sm sm:text-base">{talent?.description}</p>
              </div>
            </div>

            {/* Image Section */}
            <FilesDisplayHelper cloudFiles={talent?.images} />

            {/* Buttons */}
            {!isUsedWithModal && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => navigate(`/talent/edit/${talent._id}`)}
                >
                  Edit Talent
                </Button>
                <Button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => handleDelete(talent._id)}
                >
                  Delete Talent
                </Button>
                <Button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md"
                  onClick={() => navigate('/talent')}
                >
                  Manage Talents
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </QueryHandler>
  );
}

export default Talent;
