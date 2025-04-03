import  { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import databaseService from '../../services/database.services';
import { ParentForm, QueryHandler } from '../../components';
import useCustomReactQuery from '../../utils/useCustomReactQuery';

function EditParent() {
  const { parentId } = useParams();
  const navigate = useNavigate();
  const [parent, setParent] = useState(null);

  const fetchParent = useCallback(
    () => databaseService.getParentDetailsById({ parentId }),
    [parentId]
  );
  const { data, loading, error } = useCustomReactQuery(fetchParent);

  useEffect(() => {
    if (!parentId) {
      navigate('/');
      return;
    }
    if (data) {
      setParent(data);
    }
  }, [data, parentId, navigate]);

  return (
    <>
    <QueryHandler queries={[{ loading, error }]}>
      {parent && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Parent Details</h2>

          <ParentForm parent={parent} />
        </div>
      )}
    </QueryHandler>
      </>
  );
}

export default EditParent;
