import  { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import databaseService from '../../services/database.services.js';
import useCustomReactQuery from '../../utils/useCustomReactQuery.js';
import { QueryHandler, Button } from '../../components/index.js';

function UserPosts() {
  const userId = useSelector((state) => state.auth.userData?._id);
  const navigate = useNavigate();

  // Fetch user's posts
  const fetchUserPosts = useCallback(() => databaseService.getPostsByUserId({ userId }), [userId]);
  const { data: posts, loading, error } = useCustomReactQuery(fetchUserPosts);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">📌 My Posts</h1>

        {/* If no posts found */}
        {posts?.length === 0 && (
          <p className="text-gray-500 text-center">You haven't created any posts yet.</p>
        )}

        {/* Button to Add New Post */}
        <div className="flex justify-center m-4">
          <Button
            onClick={() => navigate('/post/add')}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            ➕ Create New Post
          </Button>
        </div>

        {/* Post List */}
        {posts?.map((post) => (
          <div
            key={post._id}
            onClick={() => navigate(`/post/${post._id}`)}
            className="border border-gray-300 p-4 rounded-lg mb-3 cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Post Title */}
            <h2 className="text-lg font-semibold text-blue-600 hover:underline">{post.title}</h2>

            {/* Post Status & Approval */}
            <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  post.status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {post.status.toUpperCase()}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  post.isApproved ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                }`}
              >
                {post.isApproved ? '✅ Approved' : '⏳ Pending Approval'}
              </span>
            </div>

            {/* Creation Date */}
            <p className="text-xs text-gray-400 mt-2">
              Created on: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </QueryHandler>
  );
}

export default UserPosts;
