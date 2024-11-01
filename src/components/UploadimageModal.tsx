// components/UploadImageModal.tsx
import React, { useState } from 'react';
import { upload_profile_image } from '../lib/mutations'; // Adjust the path as necessary
import Cookies from 'js-cookie';

interface UploadImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({ isOpen, onClose }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    
    if (!imageFile) return;

    setLoading(true);
    setError(null); // Reset error state

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result as ArrayBuffer;

      try {
        const token = Cookies.get('token');
        const userId = Cookies.get('id');
        const response = await upload_profile_image(userId, token, imageData);
        console.log(response); // Handle response (you can display success message or refresh data)
        onClose(); // Close modal after successful upload
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    reader.readAsArrayBuffer(imageFile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-bold mb-2">Upload Profile Image</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-4">
          <button onClick={handleUpload} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          <button onClick={onClose} className="ml-2 border px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadImageModal;
