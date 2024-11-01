"use client";
import React, { useState, useEffect } from 'react';
import UploadImageModal from '@/components/UploadimageModal';
import { user_details } from '@/lib/queries'; // Adjust the import path as necessary
import Cookies from 'js-cookie';
import Banner from '@/components/ProfileBanner';
import { useRouter } from 'next/navigation';
import EditModal from '@/components/EditModal';
import { updateUserDetails } from '@/lib/mutations'; // Adjust the import path for your API function

const MyProfile: React.FC = () => {
  const id = Cookies.get('id');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null); // Adjust the type as needed
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleEditOpenModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleLogout = () => {
    Cookies.set('id', '');
    Cookies.set('token', '');
    Cookies.set('isLoggedIn', 'false');
    router.push('/');
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
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>; // Loading state
  }

  const handleEditSubmit = async (updatedData: { username: string; dpImage: ArrayBuffer; bio:string }) => {
    try {
      await updateUserDetails(updatedData.dpImage, id, updatedData.username, updatedData.bio);
      fetchUserDetails(); // Refetch user details after updating
      handleEditCloseModal(); // Close the edit modal
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Banner
        profileImage={userData.dpImage} // Replace with actual image URL
        profileName={userData.username}
        numberOfPosts={userData.profileImages.length}
        bio={userData.bio}
        onPost={handleOpenModal}
        onLogout={handleLogout}
        onEdit={handleEditOpenModal}
        showButtons={true}
      />

      <UploadImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUploadSuccess={fetchUserDetails} // Pass the fetch function as a prop
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleEditCloseModal}
        onSubmit={handleEditSubmit}
        userData={userData} // Pass existing user data
      />

      <h2 className="mt-8 mb-4 text-xl font-semibold text-gray-800">Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userData.profileImages.map((image: any, index: number) => (
          <div key={index} className="relative overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img
              src={image.data}
              alt={`Profile Image ${index + 1}`}
              className="object-cover w-full h-48 rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
