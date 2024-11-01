"use client";
import React, { useState } from 'react';
import { login } from '../lib/mutations'; // Adjust the path as necessary
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
    onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await login(username, password);
            console.log('Login successful:', response);
            Cookies.set('id', response.id);
            Cookies.set('token', response.token);
            Cookies.set('isLoggedIn', "true");
            router.push('/my-profile');
            // Handle successful login (e.g., redirect or save token)
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <button onClick={onSwitch}>Switch to Register</button>
        </div>
    );
};

export default LoginForm;
