import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEMINAR_HALLS, HALL_FACILITIES } from '../data.js';

export default function Facilities() {
    const [selectedHall, setSelectedHall] = useState(SEMINAR_HALLS[0]);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 py-12 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our World-Class Facilities</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Each of our halls is equipped with specific amenities to suit your event's needs.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                    <h2 className="text-2xl font-bold mb-4">Select a Hall</h2>
                    <div className="space-y-2">
                        {SEMINAR_HALLS.map(hall => (
                            <button key={hall} onClick={() => setSelectedHall(hall)} className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${selectedHall === hall ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                                {hall}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold mb-4">Facilities in <span className="text-indigo-500">{selectedHall}</span></h2>
                    <AnimatePresence mode="wait">
                        <motion.div key={selectedHall} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants} initial="hidden" animate="visible">
                                {HALL_FACILITIES[selectedHall]?.length > 0 ? (
                                    HALL_FACILITIES[selectedHall].map((facility, index) => (
                                        facility.icon && (
                                            <motion.div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6" variants={cardVariants}>
                                                <div className="flex items-center mb-3">
                                                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-full mr-4">
                                                        <facility.icon className="text-indigo-600 dark:text-indigo-400" size={24} />
                                                    </div>
                                                    <h3 className="text-xl font-bold">{facility.name}</h3>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 text-sm">{facility.description}</p>
                                            </motion.div>
                                        )
                                    ))
                                ) : (
                                    <p className="md:col-span-2 text-gray-500">Facilities information for this hall is not available.</p>
                                )}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};