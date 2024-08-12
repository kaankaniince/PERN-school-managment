import React, { useEffect, useState } from "react";
import Sidebar from "../../SideBar/Sidebar.jsx";
const StudentDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('id')
            if(!id) return;
            const response = await fetch(`http://localhost:5000/student/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user)

            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
            Welcome, {user.fname + ' ' + user.lname}
            <Sidebar role={user.role_id} />
        </div>

    )
}
export default StudentDashboard;