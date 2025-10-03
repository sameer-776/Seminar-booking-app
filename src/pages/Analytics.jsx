import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import AnalyticsDashboard from '../components/AnalyticsDashboard.jsx';

export default function Analytics({ currentUser, allBookings }) {
    // 1. Check if the user is an admin
    if (currentUser?.role !== 'admin') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center text-center p-4" style={{ minHeight: 'calc(100vh - 8rem)' }}>
                <div>
                    <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
                    <h1 className="mt-4 text-3xl font-bold">Access Denied</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">You do not have permission to view this page.</p>
                    <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700">
                        Go to Homepage
                    </Link>
                </div>
            </motion.div>
        );
    }

    // 2. If they are an admin, show the analytics dashboard
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 pb-12 md:pb-24">
            <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
            <AnalyticsDashboard allBookings={allBookings} />
        </motion.div>
    );
}