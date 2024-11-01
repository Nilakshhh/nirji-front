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
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">All Users</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={user.dpImage}
                            alt={`${user.username}'s profile`}
                            className="rounded-full h-24 w-24 object-cover mb-4 border-4 border-indigo-200"
                        />
                        <h3
                            className="text-lg font-medium text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors duration-200"
                            onClick={() => router.push(`/profile/${user.id}`)}
                        >
                            {user.username}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList;
