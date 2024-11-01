"use client";
import React, { useState, useEffect } from 'react';
import UploadImageModal from '@/components/UploadimageModal';
import { user_details } from '@/lib/queries'; // Adjust the import path as necessary
import Cookies from 'js-cookie';
import Banner from '@/components/ProfileBanner';

const MyProfile: React.FC = () => {
  const id = Cookies.get('id'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null); // Adjust the type as needed

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserDetails = async () => {
    try {
      const data = await user_details(id); // Fetch user details using the user ID
      setUserData(data); // Store the user data in state
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails(); // Fetch details if the ID is available
    }
  }, [id]); // Run this effect when the component mounts or when the ID changes

  if (!userData) {
    return <div>Loading...</div>; // Optional loading state while fetching user details
  }

  return (
    <div>
      <Banner
        profileImage={userData.dpImage} // Replace with actual image URL
        profileName={userData.username}
        numberOfPosts={userData.profileImages.length}
        onPost={handleOpenModal}
      />
      
      <UploadImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUploadSuccess={fetchUserDetails} // Pass the fetch function as a prop
      />
      
      <h2 className="mt-4">Posts</h2>
      <div className="grid grid-cols-3 gap-2">
        {userData.profileImages.map((image: any, index: number) => (
          <img key={index} src={image.data} alt={`Profile Image ${index + 1}`} className="rounded-lg w-full h-auto" />
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
