"use client";

import React, { useState } from 'react';
import { register } from '../lib/mutations'; // Adjust the path as necessary
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface RegisterFormProps {
  onSwitch: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dpImage, setDpImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (dpImage) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(dpImage);
      reader.onloadend = async () => {
        const imageData = reader.result as ArrayBuffer | null;

        try {
          const response = await register(username, email, password, imageData);
          console.log('Registration successful:', response);
          Cookies.set('id', response.id);
          Cookies.set('token', response.token);
          Cookies.set('isLoggedIn', "true");
          router.push('/my-profile');
        } catch (err: any) {
          setError(err.message);
        }
      };
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDpImage(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div>
            <label htmlFor="dpImage" className="block text-gray-700 font-medium mb-2">Your Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              id="dpImage"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>
        <button
          onClick={onSwitch}
          className="w-full mt-4 text-indigo-600 hover:underline text-center"
        >
          Switch to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
