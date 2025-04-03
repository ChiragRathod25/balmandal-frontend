import  { useCallback } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../../services/database.services";
import { PostForm, QueryHandler } from "../../components";
import useCustomReactQuery from "../../utils/useCustomReactQuery";

function EditPost() {
  const { postId } = useParams();
  const fetchPost = useCallback(() => databaseService.getPostById({ postId }), [postId]);
  const { loading, error, data: post } = useCustomReactQuery(fetchPost);

  return (
    <QueryHandler queries={[{ loading, error }]}>
      <div className=" mx-auto p-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Edit Post</h1>

        {/* Post Form */}
        {post ? <PostForm post={post} /> : <p className="text-center text-gray-500">Post not found.</p>}
      </div>
    </QueryHandler>
  );
}

export default EditPost;
