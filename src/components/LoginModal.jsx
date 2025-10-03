import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function LoginModal({ users, onClose, onLoginSuccess }) {
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            setError('');
            onLoginSuccess({ name: foundUser.name, role: foundUser.role, department: foundUser.department });
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        // These classes make it a full-screen, centered overlay
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        {/* These classes fix the color contrast */}
                        <input name="email" type="email" required className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        {/* These classes fix the color contrast */}
                        <input name="password" type="password" required className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full py-3 mt-2 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Sign In</button>
                </form>
            </motion.div>
        </motion.div>
    );
};