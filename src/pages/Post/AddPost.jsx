import { PostForm } from "../../components";

function AddPost() {
  return (
    <div className=" mx-auto p-4 w-full">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Create a New Post</h1>

      {/* Post Form Component */}
      <PostForm />
    </div>
  );
}

export default AddPost;
