import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export default function UserManagement({ users, onAddUser, onDeleteUser }) {
    const handleAddUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newUser = {
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            department: formData.get('department'),
            role: formData.get('role'),
            password: 'password123'
        };
        onAddUser(newUser);
        e.target.reset();
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">Add New User</h3>
                <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <input name="name" required placeholder="Full Name" className="p-2 w-full rounded border bg-transparent dark:border-gray-600" />
                    <input name="email" type="email" required placeholder="Email" className="p-2 w-full rounded border bg-transparent dark:border-gray-600" />
                    <input name="department" required placeholder="Department" className="p-2 w-full rounded border bg-transparent dark:border-gray-600" />
                    {/* --- THIS DROPDOWN IS NOW STYLED FOR DARK MODE --- */}
                    <select name="role" className="p-2 w-full rounded border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="bg-indigo-600 text-white p-2 rounded-lg font-semibold hover:bg-indigo-700">Add User</button>
                </form>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">Existing Users</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
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
                                            <button onClick={() => onDeleteUser(user.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
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