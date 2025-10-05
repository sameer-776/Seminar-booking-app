import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export default function UserManagement({ users, onAddUser, onDeleteUser }) {
    const [error, setError] = useState('');

    const handleAddUser = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        const formData = new FormData(e.target);
        const email = formData.get('email');

        // --- NEW: Check for duplicate email ---
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            setError('A user with this email address already exists.');
            return;
        }

        const newUser = {
            id: Date.now(),
            name: formData.get('name'),
            email: email,
            password: formData.get('password'),
            designation: formData.get('designation'),
            department: formData.get('department'),
            phone: formData.get('phone'),
            role: formData.get('role'),
        };
        onAddUser(newUser);
        e.target.reset();
    };

    const inputClasses = "p-2 w-full rounded border bg-transparent dark:border-gray-600 focus:ring-2 focus:ring-indigo-500";
    const labelClasses = "block text-sm font-semibold mb-1";

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">Add New User</h3>
                <form onSubmit={handleAddUser} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="name" className={labelClasses}>Full Name</label>
                            <input id="name" name="name" required placeholder="Full Name" className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="email" className={labelClasses}>Email</label>
                            <input id="email" name="email" type="email" required placeholder="Email" className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="password" className={labelClasses}>Password</label>
                            <input id="password" name="password" type="password" required placeholder="Password" className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="phone" className={labelClasses}>Phone No.</label>
                            <input id="phone" name="phone" type="tel" placeholder="Phone Number" className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="designation" className={labelClasses}>Designation</label>
                            <input id="designation" name="designation" placeholder="e.g., Professor" className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="department" className={labelClasses}>Department</label>
                            <input id="department" name="department" placeholder="e.g., Computer Science" className={inputClasses} />
                        </div>
                        <div>
                            <label htmlFor="role" className={labelClasses}>Role</label>
                            <select id="role" name="role" className={`p-2 w-full rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${inputClasses}`}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    <div className="flex justify-end">
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-700">Add User</button>
                    </div>
                </form>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">Existing Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[768px]">
                        <thead>
                            <tr className="border-b dark:border-gray-600">
                                <th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Department</th>
                                <th className="p-2">Role</th><th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b dark:border-gray-700">
                                    <td className="p-2 font-semibold">{user.name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.department}</td>
                                    <td className="p-2 capitalize">{user.role}</td>
                                    <td className="p-2 text-center">
                                        {user.role !== 'admin' && (
                                            <button onClick={() => onDeleteUser(user.id)} className="text-red-500 hover:text-red-700">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}