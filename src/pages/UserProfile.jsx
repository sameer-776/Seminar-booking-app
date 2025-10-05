import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

export default function UserProfile({ currentUser, onUpdateUser }) {
    const [message, setMessage] = useState('');

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = {
            ...currentUser,
            name: formData.get('name'),
            email: formData.get('email'),
            department: formData.get('department'),
            designation: formData.get('designation'),
            phone: formData.get('phone'),
        };

        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');

        // Basic password change validation
        if (currentPassword || newPassword) {
            if (currentPassword !== currentUser.password) {
                setMessage('Incorrect current password.');
                return;
            }
            if (newPassword.length < 6) {
                setMessage('New password must be at least 6 characters long.');
                return;
            }
            updatedUser.password = newPassword;
        }
        
        onUpdateUser(updatedUser);
        setMessage('Profile updated successfully!');
    };

    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
    const inputClasses = "mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600";

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 py-12 md:py-24 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className={labelClasses}>Full Name</label>
                        <input id="name" name="name" type="text" defaultValue={currentUser.name} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="email" className={labelClasses}>Email</label>
                        <input id="email" name="email" type="email" defaultValue={currentUser.email} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="department" className={labelClasses}>Department</label>
                        <input id="department" name="department" type="text" defaultValue={currentUser.department} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="designation" className={labelClasses}>Designation</label>
                        <input id="designation" name="designation" type="text" defaultValue={currentUser.designation} className={inputClasses} />
                    </div>
                </div>
                
                <hr className="dark:border-gray-600" />

                <div>
                    <h3 className="text-lg font-medium leading-6">Change Password</h3>
                    <p className="mt-1 text-sm text-gray-500">Leave these fields blank to keep your current password.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="currentPassword" className={labelClasses}>Current Password</label>
                        <input id="currentPassword" name="currentPassword" type="password" className={inputClasses} />
                    </div>
                     <div>
                        <label htmlFor="newPassword" className={labelClasses}>New Password</label>
                        <input id="newPassword" name="newPassword" type="password" className={inputClasses} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700">
                        Save Changes
                    </button>
                </div>
                {message && <p className="text-center text-green-500">{message}</p>}
            </form>
        </motion.div>
    );
}