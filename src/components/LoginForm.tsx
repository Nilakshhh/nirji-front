import React, { useState } from 'react';
import { login } from '../lib/mutations'; // Adjust the path as necessary

interface LoginFormProps {
    onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await login(username, password);
            console.log('Login successful:', response);
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
