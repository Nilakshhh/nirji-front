import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: any) => void; // Adjust type as needed
  userData: any; // Replace with the appropriate type for user data
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit, userData }) => {
  const [username, setUsername] = useState(userData.username);
  const [bio, setBio] = useState(userData.bio); // Add state for bio
  const [dpImage, setDpImage] = useState<string | null>(userData.dpImage);
  const [newDpImage, setNewDpImage] = useState<ArrayBuffer | null>(null); // To hold the new uploaded image

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer; 
        setNewDpImage(arrayBuffer);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      username,
      bio, // Include bio in the updated data
      dpImage: newDpImage || dpImage,
    };
    onSubmit(updatedData);
    onClose();
  };

  useEffect(() => {
    // Update state when userData changes
    setUsername(userData.username);
    setBio(userData.bio); // Set bio from userData
    setDpImage(userData.dpImage);
  }, [userData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={bio} // Bind textarea to bio state
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              rows={3} // Set rows for better height
              maxLength={3000} // Limit the bio length
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            {dpImage && (
              <div className="mb-2">
                <img
                  src={dpImage} // Display existing image using the Base64 string
                  alt="Profile"
                  className="w-full h-32 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
