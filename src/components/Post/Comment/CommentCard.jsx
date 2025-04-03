import { useSelector } from 'react-redux';

function CommentCard({ comment }) {
  const authUser = useSelector((state) => state.auth.userData); // Get logged-in user

  const isUserComment = comment.createdBy === authUser._id;

  return (
    <div className={`flex ${isUserComment ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`p-3 rounded-lg shadow-md max-w-xs md:max-w-md flex gap-3 
        ${isUserComment ? 'bg-blue-500 text-white flex-row-reverse' : 'bg-gray-200 text-black'}
      `}
      >
        {/* Profile Picture */}
        <img
          src={
            isUserComment
              ? authUser.avatar || '/avatar.png'
              : comment?.user?.avatar || '/avatar.png'
          }
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />

        {/* Comment Content */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{isUserComment ? 'You' : comment?.user?.username}</p>
          <p className="text-base break-words">{comment.content}</p>
          {/* <p className="text-xs opacity-70 mt-1">
            {new Date(comment.createdAt).toLocaleString()}
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default CommentCard;
