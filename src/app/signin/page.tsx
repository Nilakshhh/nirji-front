"use client";
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // State to track which form to show

  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Toggle the form
  };

  return (
    <div>
      {isLogin ? (
        <LoginForm onSwitch={toggleForm} />
      ) : (
        <RegisterForm onSwitch={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;
