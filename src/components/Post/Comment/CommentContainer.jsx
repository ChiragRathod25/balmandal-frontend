import  { useCallback, useEffect, useState } from 'react';
import { CommentCard, CommentForm } from '../../index.js';
import databaseService from '../../../services/database.services.js';
import useCustomReactQuery from '../../../utils/useCustomReactQuery.js';
import { useParams } from 'react-router-dom';

function CommentContainer() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  const fetchPostComments = useCallback(() => databaseService.getCommentsByPostId({ postId }), [postId]);
  const { loading, error, data: initialComments } = useCustomReactQuery(fetchPostComments);

  useEffect(() => {
    if (initialComments) {
      setComments(initialComments);
    }
  }, [initialComments]);

  
  const handleNewComment = (newComment) => {
    
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg font-semibold">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center text-lg font-semibold">{error}</div>;
  }

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      <CommentForm onCommentAdded={handleNewComment} />
      {comments.length > 0 ? (
        <div className="mt-4 space-y-3">
          {comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-2">No comments yet. Be the first to comment!</div>
      )}
    </div>
  );
}

export default CommentContainer;
