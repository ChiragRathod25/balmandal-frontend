import { useCallback, useEffect, useState } from 'react';
import { CommentContainer, QueryHandler } from '../index';
import databaseService from '../../services/database.services';
import { useParams } from 'react-router-dom';
import useCustomReactQuery from '../../utils/useCustomReactQuery';
import { useSelector } from 'react-redux';

function PostInteractions() {
  const { postId } = useParams();
  const authUser = useSelector((state) => state.auth.userData);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isCommentContainerVisible, setIsCommentContainerVisible] = useState(false);

  const fetchPostLikes = useCallback(() => databaseService.getLikesByPostId(postId), [postId]);
  const { data: initialLikes, loading, error } = useCustomReactQuery(fetchPostLikes);

  useEffect(() => {
    if (initialLikes) {
      setLikes(initialLikes);
      setLikeCount(initialLikes.length);
      setIsLiked(initialLikes.some((like) => like.createdBy === authUser._id));
    }
  }, [initialLikes, authUser]);

  const handleLikeClick = async () => {
    if (!authUser) return;

    if (isLiked) {
      setLikes(likes.filter((like) => like.createdBy !== authUser._id));
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
      await databaseService.togglePostLike(postId);
    } else {
      const newLike = { postId, createdBy: authUser._id };
      setLikes([...likes, newLike]);
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
      await databaseService.togglePostLike(postId);
    }
  };
  const handleShareClick = async () => {
    // by clicking it user can copy the post link to the clipboard and it will be shared in the social media
    const postLink = `${window.location.origin}/post/${postId}`;
    try {
      await navigator.clipboard.writeText(postLink);
      // show share options to social media on mobile and desktop
      const shareData = {
        title: 'Check out this post!',
        text: `Read this post `,
        url: postLink,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      }
    } catch (err) {
      console.error('Error copying link: ', err);
    }
  };

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="flex flex-row items-center justify-between p-4 border-t border-gray-300">
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="flex items-center gap-2 text-lg font-medium transition-all duration-200"
        >
          <span
            className={`text-2xl transition-transform duration-200 ${isLiked ? 'text-blue-500 scale-110' : 'text-gray-500'}`}
          >
            {isLiked ? '👍' : '👍🏻'}
          </span>
          <span className="text-gray-700">{likeCount}</span>
        </button>

        <button
          onClick={() => setIsCommentContainerVisible(!isCommentContainerVisible)}
          className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-gray-900 transition-all duration-200"
        >
          💬 <span>Comment</span>
        </button>

        <button
          className="flex items-center gap-2 text-lg font-medium text-gray-600 hover:text-gray-900 transition-all duration-200"
          onClick={() => handleShareClick()}
        >
          🔗 <span>Share</span>
        </button>
      </div>

      {isCommentContainerVisible && <CommentContainer />}
    </QueryHandler>
  );
}

export default PostInteractions;
