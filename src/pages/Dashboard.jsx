import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCategories: 0,
        totalProducts: 0,
        totalSuppliers: 0,
        totalPurchases: 0,
        totalSales: 0,
        totalSalesAmount: 0,
        totalPurchasesAmount: 0,
        salesData: [],
        purchaseData: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:8000/dashboard-stats');
                console.log(response.data);
                setStats(response.data);
            } catch (error) {
                setError("Error fetching dashboard stats");
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <LoadingSpinner></LoadingSpinner>
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <StatCard title="Total Categories" value={stats.totalCategories} bgColor="bg-blue-500" />
                <StatCard title="Total Products" value={stats.totalProducts} bgColor="bg-green-500" />
                <StatCard title="Total Suppliers" value={stats.totalSuppliers} bgColor="bg-purple-500" />
                <StatCard title="Total Purchases" value={stats.totalPurchases} bgColor="bg-pink-500" />
                <StatCard title="Total Sales" value={stats.totalSales} bgColor="bg-yellow-500" />
                <StatCard title="Total Purchases Amount" value={`$${stats.totalPurchasesAmount}`} bgColor="bg-red-500" /> {/* Updated Card */}
                <StatCard title="Total Sales Amount" value={`$${stats.totalSalesAmount}`} bgColor="bg-orange-500" /> {/* Updated Card */}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, bgColor }) => (
    <div className={`${bgColor} text-white rounded-lg p-6 flex flex-col items-center shadow-lg transition-transform transform hover:scale-105`}>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-4xl font-semibold mt-2">{value}</p>
    </div>
);

export default Dashboard;
