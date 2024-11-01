// components/UsersList.tsx
import React, { useEffect, useState } from 'react';
import { all_users } from '../lib/queries'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';

interface User {
    id: number; // or whatever your user ID type is
    username: string;
    dpImage: string; // URL or base64 string of the image
}

const UsersList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await all_users();
                setUsers(response); // assuming the response is an array of users
                console.log(response);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>All Users</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 shadow-md">
                        <img src={user.dpImage} alt={`${user.username}'s profile`} className="rounded-full h-20 w-20 object-cover mb-2" />
                        <h3 className="font-bold cursor-pointer" onClick={() => router.push(`/profile/${user.id}`)}>{user.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList;
