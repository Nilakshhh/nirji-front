"use client";
import React, { useState } from 'react';
import UploadImageModal from '@/components/UploadimageModal';

const MyProfile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>My Profile</h1>
      <button onClick={handleOpenModal} className="bg-green-500 text-white px-4 py-2 rounded">
        Upload Profile Image
      </button>
      <UploadImageModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MyProfile;
