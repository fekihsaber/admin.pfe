import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchData = async () => {
        try {
            const dashboardResponse = await fetch('http://localhost:4000/dashboard');

            if (!dashboardResponse.ok) {
                throw new Error('Failed to fetch data');
            }

            const dashboardData = await dashboardResponse.json();

            setTotalProducts(dashboardData.totalProducts);
            setTotalUsers(dashboardData.totalUsers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <div className="dashboard-info">
                <div className="dashboard-item">
                    <p>Total Products</p>
                    <span>{totalProducts}</span>
                </div>
                <div className="dashboard-item">
                    <p>Total Users</p>
                    <span>{totalUsers}</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
