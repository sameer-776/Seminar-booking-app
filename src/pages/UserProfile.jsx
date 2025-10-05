import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

export default function UserProfile({ currentUser, onUpdateUser }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);

    if (!currentUser) return <Navigate to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const formData = new FormData(e.target);

        const updatedUser = {
            ...currentUser,
            name: formData.get('name'),
            email: formData.get('email'),
            department: formData.get('department'),
            designation: formData.get('designation'),
            phone: formData.get('phone'),
        };

        // Read and trim inputs (avoid null/undefined)
        const currentPassword = (formData.get('currentPassword') || '').toString().trim();
        const newPassword = (formData.get('newPassword') || '').toString().trim();
        const confirmPassword = (formData.get('confirmPassword') || '').toString().trim();

        // Normalize stored password to string and trim it
        const storedPassword = (currentUser?.password ?? '').toString().trim();

        // If any password field is used, validate all password rules
        if (currentPassword || newPassword || confirmPassword) {
            // If stored password is not available, prompt re-login or admin to reset
            if (!storedPassword) {
                setError('Current password is not available in this session. Please re-login and try again.');
                return;
            }

            if (currentPassword !== storedPassword) {
                setError('Incorrect current password.');
                return;
            }

            if (!newPassword || newPassword.length < 6) {
                setError('New password must be at least 6 characters long.');
                return;
            }

            if (newPassword !== confirmPassword) {
                setError('New passwords do not match.');
                return;
            }

            updatedUser.password = newPassword;
        }

        // Call parent handler (App.jsx will persist to localStorage)
        onUpdateUser(updatedUser);

        // Reset form fields and show success
        e.target.reset();
        setShowPasswords(false);
        setMessage('Profile updated successfully!');
    };

    const label = "block text-sm font-medium text-gray-700 dark:text-gray-300";
    const input = "mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500";

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 py-12 md:py-24 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                {/* Personal Info */}
                <div>
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label htmlFor="name" className={label}>Full Name</label>
                            <input id="name" name="name" type="text" defaultValue={currentUser.name} className={input} />
                        </div>
                        <div>
                            <label htmlFor="email" className={label}>Email</label>
                            <input id="email" name="email" type="email" defaultValue={currentUser.email} className={input} />
                        </div>
                        <div>
                            <label htmlFor="department" className={label}>Department</label>
                            <input id="department" name="department" type="text" defaultValue={currentUser.department} className={input} />
                        </div>
                        <div>
                            <label htmlFor="designation" className={label}>Designation</label>
                            <input id="designation" name="designation" type="text" defaultValue={currentUser.designation} className={input} />
                        </div>
                    </div>
                </div>

                <hr className="dark:border-gray-600" />

                {/* Password Section */}
                <div>
                    <h3 className="text-xl font-semibold">Change Password</h3>
                    <p className="mt-1 text-sm text-gray-500">Leave blank to keep your current password.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="currentPassword" className={label}>Current Password</label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type={showPasswords ? "text" : "password"}
                            className={input}
                            autoComplete="current-password"
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className={label}>New Password</label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPasswords ? "text" : "password"}
                            className={input}
                            autoComplete="new-password"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className={label}>Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPasswords ? "text" : "password"}
                            className={input}
                            autoComplete="new-password"
                        />
                    </div>
                </div>

                {/* Show passwords toggle */}
                <div className="flex items-center gap-3 pt-2">
                    <input
                        id="showPasswords"
                        type="checkbox"
                        checked={showPasswords}
                        onChange={(e) => setShowPasswords(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="showPasswords" className="text-sm text-gray-600 dark:text-gray-300">Show passwords</label>
                </div>

                {/* Feedback + Button */}
                <div className="pt-4 flex justify-between items-center">
                    <div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {message && <p className="text-sm text-green-500">{message}</p>}
                    </div>
                    <button type="submit" className="px-6 py-2 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
