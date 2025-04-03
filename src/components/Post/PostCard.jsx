import  { useState } from "react";
import Parse from "html-react-parser";
import { Link } from "react-router-dom";
function PostCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 120; // Character limit for preview text

  // Function to truncate content
  const getPreviewText = () => {
    if (!post?.content) return "";
    return post.content.length > previewLength && !expanded
      ? post.content.slice(0, previewLength) + "..."
      : post.content;
  };

  return post ? (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all hover:shadow-lg">
      {/* Post Image (adjusted for mobile) */}
      {post?.featuredImage && (
        <img
          className="w-full h-40 sm:h-52 object-cover object-center"
          src={post?.featuredImage}
          alt="blog"
        />
      )}

      {/* Post Content */}
      <div className="p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          {post.title}
        </h2>

        {/* Post Preview Content */}
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          {Parse(getPreviewText())}
        </p>

        {/* Read More Toggle */}
        {post.content.length > previewLength && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </span>
        )}

        {/* Post Meta Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">
          <p>{post.createdAt}</p>
          <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline mt-1 sm:mt-0">
            Read full post →
          </Link>
        </div>
      </div>
    </div>
  ) : null;
}

export default PostCard;
