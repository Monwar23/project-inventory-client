import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import useUsers from "../../hooks/useUsers";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [users, refetch] = useUsers(); // Fetch user data from the custom hook
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSignIn = (e) => {
        e.preventDefault();

        // Find the user based on email and password
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            if (user.role === 'admin' || user.role === 'editor') {
                setTimeout(() => {
                    navigate('/'); // Replace with your actual dashboard route
                }, 1000);
            } else {
                setMessage('You do not have permission to access the Inventory. Please try again.');
                resetForm();
            }
        } else {
            setMessage('Invalid email or password. Please try again.');
            resetForm();
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required 
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password" 
                            required 
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
                {message && <div className="mt-4 text-center text-red-500">{message}</div>}
            </div>
        </div>
    );
};

export default SignIn;
