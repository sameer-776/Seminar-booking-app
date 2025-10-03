import React from 'react';

export default function StatCard({ icon: Icon, title, value }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                <Icon className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold">{value}</p>
            </div>
        </div>
    );
};