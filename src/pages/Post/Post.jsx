import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Parse from "html-react-parser";
import databaseService from "../../services/database.services.js";
import useCustomReactQuery from "../../utils/useCustomReactQuery.js";
import { QueryHandler, Button, PostInteractions } from "../../components/index.js";

function Post() {
  const isAdmin = useSelector((state) => state.auth?.userData?.isAdmin);
  const authUser = useSelector((state) => state.auth?.userData);
  const { postId } = useParams();
  const navigate = useNavigate();

  // Fetch post data
  const fetchPost = useCallback(() => databaseService.getPostById({ postId }), [postId]);
  const { loading, error, data: post } = useCustomReactQuery(fetchPost);

  // Handle post approval
  const handleApprove = async (postId) => {
    try {
      const response = await databaseService.toggleIsApproved({ postId }).then((res) => res.data);
      if (response) {
        navigate("/post");
      } else {
        throw new Error("Error updating post approval status.");
      }
    } catch (error) {
      console.error("Error while updating post status:", error);
    }
  };

  // Handle delete post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const response = await databaseService.deletePost({ postId }).then((res) => res.data);
      if (response) {
        navigate("/post");
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
    }
  };

  // Guard for missing post
  if (!post) return null;

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Post Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{post?.title}</h1>

        {/* Post Meta Info */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          {isAdmin && <span>📝 By: {post?.createdBy || "Unknown"}</span>}
          <span>📅 {new Date(post?.createdAt).toLocaleString()}</span>
        </div>

        {/* Post Content */}
        <div className="prose text-gray-800 leading-relaxed mb-6">
          {Parse(post?.content || "")}
        </div>

        {/* Post Interactions */}
        <PostInteractions />

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {/* Show Edit/Delete if owner or admin */}
          {(authUser && post?.createdBy === authUser?._id) || isAdmin ? (
            <>
              <Button
                onClick={() => navigate("/post/edit/" + postId)}
                className="bg-blue-500 text-white rounded-lg"
              >
                ✏️ Edit
              </Button>
              <Button
                onClick={() => handleDelete(post?._id)}
                className="bg-red-500 text-white rounded-lg"
              >
                🗑️ Delete
              </Button>
            </>
          ) : null}

          {/* Admin Approve/Disapprove Buttons */}
          {isAdmin && (
            <>
              {post?.isApproved ? (
                <Button
                  onClick={() => handleApprove(post?._id)}
                  className="bg-red-500 text-white rounded-lg"
                >
                  ✖ Disapprove
                </Button>
              ) : (
                <Button
                  onClick={() => handleApprove(post?._id)}
                  className="bg-green-500 text-white rounded-lg"
                >
                  ✅ Approve
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </QueryHandler>
  );
}

export default Post;
