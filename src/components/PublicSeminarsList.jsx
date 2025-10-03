import React from 'react';
import { motion } from 'framer-motion';
import data from '../bookings.json';

// Ensure the initialSeminars key exists in your bookings.json
const { initialSeminars } = data || { initialSeminars: [] };

export default function PublicSeminarsList() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingSeminars = (initialSeminars || []).filter(seminar => new Date(seminar.date) >= today);
    
    return (
        <motion.div
            key="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
            {upcomingSeminars.length > 0 ? (
                upcomingSeminars.map(seminar => (
                    <motion.div
                        key={seminar.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">{seminar.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{seminar.date} | {seminar.hall}</p>
                        <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300">{seminar.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="font-semibold text-sm">Capacity: {seminar.capacity}</span>
                            <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed">Details</button>
                        </div>
                    </motion.div>
                ))
            ) : (
                <p className="text-center text-gray-500 md:col-span-2">There are no upcoming seminars scheduled at this time.</p>
            )}
        </motion.div>
    );
}