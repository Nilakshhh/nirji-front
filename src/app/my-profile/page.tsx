"use client";
import React, { useState, useEffect } from 'react';
import UploadImageModal from '@/components/UploadimageModal';
import { user_details } from '@/lib/queries';
import Cookies from 'js-cookie';
import Banner from '@/components/ProfileBanner';
import { useRouter } from 'next/navigation';
import EditModal from '@/components/EditModal';
import { updateUserDetails, delete_profile_image } from '@/lib/mutations'; // Add delete_profile_image import

const MyProfile: React.FC = () => {
  const id = Cookies.get('id');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleEditOpenModal = () => setIsEditModalOpen(true);
  const handleEditCloseModal = () => setIsEditModalOpen(false);

  const handleLogout = () => {
    Cookies.set('id', '');
    Cookies.set('token', '');
    Cookies.set('isLoggedIn', 'false');
    router.push('/');
  };

  const fetchUserDetails = async () => {
    try {
      const data = await user_details(id);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (id) fetchUserDetails();
  }, [id]);

  if (!userData) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  const handleEditSubmit = async (updatedData: { username: string; dpImage: ArrayBuffer; bio: string }) => {
    try {
      await updateUserDetails(updatedData.dpImage, id, updatedData.username, updatedData.bio);
      fetchUserDetails();
      handleEditCloseModal();
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await delete_profile_image(id, imageId); // Call the delete mutation
      fetchUserDetails(); // Refresh user data after deleting image
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Banner
        profileImage={userData.dpImage}
        profileName={userData.username}
        numberOfPosts={userData.profileImages.length}
        numberOfLikes={userData.likes}
        bio={userData.bio}
        onPost={handleOpenModal}
        onLogout={handleLogout}
        onEdit={handleEditOpenModal}
        showButtons={true}
      />

      <UploadImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUploadSuccess={fetchUserDetails}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={handleEditCloseModal}
        onSubmit={handleEditSubmit}
        userData={userData}
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
            <button
              onClick={() => handleDeleteImage(image.id)} // Pass image ID to the delete handler
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
