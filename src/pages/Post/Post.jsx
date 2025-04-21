import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Parse from 'html-react-parser';
import databaseService from '../../services/database.services.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { QueryHandler, Button, PostInteractions } from '../../components/index.js';

function Post() {
  const isAdmin = useSelector((state) => state.auth.userData?.isAdmin);
  const { postId } = useParams();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.auth.userData);

  // Fetch post data
  const fetchPost = useCallback(() => databaseService.getPostById({ postId }), [postId]);
  const { loading, error, data: post } = useCustomReactQuery(fetchPost);

  // Handle post approval
  const handleApprove = async (postId) => {
    try {
      const response = await databaseService.toggleIsApproved({ postId }).then((res) => res.data);
      if (response?.isApproved) {
        navigate(`/post`);
      } else {
        console.error('Error updating post approval status.');
        throw new Error('Error updating post approval status.');
      }
    } catch (error) {
      console.error('Error while updating post status:', error);
    }
  };
  const handleDelete = async (postId) => {
    try {
      const response = await databaseService.deletePost({ postId }).then((res) => res.data);
      if (response) {
        navigate(`/post`);
      }
    } catch (error) {
      console.error('Error while deleting post:', error);
    }
  };

  return post ? (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Post Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{post?.title}</h1>

        {/* Post Meta Info */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          {isAdmin && <span>📝 By: {post?.createdBy || 'Unknown'}</span>}
          <span>📅 {new Date(post?.createdAt).toLocaleString()}</span>
        </div>

        {/* Post Content */}
        <div className="prose text-gray-800 leading-relaxed mb-6">{Parse(post?.content)}</div>

        {/* Tags */}
        {/* {post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )} */}

        {/* Status Badge */}
        {/* <div className="mb-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              post?.status === 'published'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {post?.status?.toUpperCase()}
          </span>
        </div> */}

        {/* Post Interactions */}
        <PostInteractions />

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          {post.createdBy === authUser._id ? (
            <>
              <Button
                onClick={() => navigate('/post/edit/' + postId)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                ✏️ Edit Post
              </Button>
              <Button
                onClick={() => handleDelete(post?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                🗑️ Delete Post
              </Button>
            </>
          ) : null}

          {isAdmin && !post?.isApproved && (
            <>
              <Button
                onClick={() => handleApprove(post?._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                ✅ Approve Post
              </Button>
            </>
          )}
          {/*show delete button only if user is admin and post is not created by the user */}
          {isAdmin && post.createdBy !== authUser._id ? (
            <Button
              onClick={() => handleDelete(post?._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              🗑️ Delete Post
            </Button>
          ) : null}
        </div>
      </div>
    </QueryHandler>
  ) : null;
}

export default Post;
