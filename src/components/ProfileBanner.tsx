import React from 'react';

interface BannerProps {
  profileImage: string;
  profileName: string;
  numberOfPosts: number;
  showButtons:boolean;
  onEdit?: () => void;
  onPost?: () => void;
  onLogout?: () => void;
}

const Banner: React.FC<BannerProps> = ({
  profileImage,
  profileName,
  numberOfPosts,
  showButtons,
  onEdit,
  onPost,
  onLogout
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
        <p className="text-gray-500">{numberOfPosts} posts</p>
      </div>
      {showButtons && <div className="space-x-2">
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
      </div>}
    </div>
  );
};

export default Banner;
