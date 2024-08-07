import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (!username) return;

            try {
                const response = await fetch(`http://localhost:5000/admin/${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred while fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
            Welcome, {user.username}
        </div>
    );
};

export default AdminDashboard;
