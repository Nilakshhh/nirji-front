import React, { useState } from 'react';
import { register } from '../lib/mutations'; // Adjust the path as necessary

interface RegisterFormProps {
  onSwitch: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dpImage, setDpImage] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setError('');

      if (dpImage) {
          const reader = new FileReader();
          reader.readAsArrayBuffer(dpImage);
          reader.onloadend = async () => {
              const imageData = reader.result as ArrayBuffer | null; // Type assertion to ensure correct type

              try {
                  const response = await register(username, email, password, imageData);
                  console.log('Registration successful:', response);
                  // Handle successful registration (e.g., redirect or show a message)
              } catch (err:any) {
                  setError(err.message);
              }
          };
      } else {
          setError("Please upload a display picture.");
      }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
          setDpImage(event.target.files[0]);
      }
  };

  return (
      <div>
          <h2>Register</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
              />
              <button type="submit">Register</button>
          </form>
          <button onClick={onSwitch}>Switch to Login</button>
      </div>
  );
};

export default RegisterForm;