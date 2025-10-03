import React from 'react';
import { motion } from 'framer-motion';
import data from '../bookings.json';

const { initialSeminars } = data;

export default function PublicSeminarsList() {
    const containerVariants = { /* ... */ };
    const itemVariants = { /* ... */ };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the beginning of the day for accurate comparison

    // Filter out seminars that have already passed
    const upcomingSeminars = initialSeminars.filter(seminar => new Date(seminar.date) >= today);
    
    return (
        <motion.div /* ... */>
            {upcomingSeminars.length > 0 ? (
                upcomingSeminars.map(seminar => (
                    <motion.div key={seminar.id} /* ... */>
                        {/* ... card content ... */}
                    </motion.div>
                ))
            ) : (
                <p className="text-center text-gray-500">There are no upcoming seminars scheduled at this time.</p>
            )}
        </motion.div>
    );
}