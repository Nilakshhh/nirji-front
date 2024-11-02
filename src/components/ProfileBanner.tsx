import React from 'react';

interface BannerProps {
  profileImage: string;
  profileName: string;
  numberOfPosts: number;
  numberOfLikes: number;
  showButtons: boolean;
  bio: string;
  onEdit?: () => void;
  onPost?: () => void;
  onLogout?: () => void;
  onLike?: (isLiking: boolean) => void;
}

const Banner: React.FC<BannerProps> = ({
  profileImage,
  profileName,
  numberOfPosts,
  numberOfLikes,
  showButtons,
  bio,
  onEdit,
  onPost,
  onLogout,
  onLike
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <img
        src={profileImage}
        alt={`${profileName}'s profile`}
        className="rounded-full h-16 w-16 object-cover"
      />
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{profileName}</h2>
        <p className="text-gray-500">{numberOfPosts} posts, {numberOfLikes} Likes</p>
        <p className="text-gray-700 mt-1">{bio}</p>
      </div>
      <div className="space-x-2">
        {showButtons ? (
          <>
            <button 
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
            <button
              onClick={onEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={onPost}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Post
            </button>
          </>
        ) : (
          <button
            onClick={() => onLike && onLike(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Like
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
