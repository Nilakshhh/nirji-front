import React, { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: any) => void; // Adjust type as needed
  userData: any; // Replace with the appropriate type for user data
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSubmit, userData }) => {
  const [username, setUsername] = useState(userData.username);
  const [dpImage, setDpImage] = useState<string | null>(userData.dpImage); // Adjust based on your dpImage structure
  const [newDpImage, setNewDpImage] = useState<ArrayBuffer | null>(null); // To hold the new uploaded image

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Store the result as ArrayBuffer
        const arrayBuffer = reader.result as ArrayBuffer; 
        setNewDpImage(arrayBuffer);
      };
      reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      username,
      dpImage: newDpImage || dpImage, // Use new image if provided, otherwise keep the old one
    };
    onSubmit(updatedData);
    onClose();
  };

  useEffect(() => {
    // Update dpImage when userData changes
    setDpImage(userData.dpImage);
  }, [userData]);

  if (!isOpen) return null; // Don't render modal if it's not open

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
