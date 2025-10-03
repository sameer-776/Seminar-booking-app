import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function Home({ currentUser }) {
    const isAdmin = currentUser?.role === 'admin';
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div ref={containerRef} className="relative h-screen overflow-hidden flex items-center justify-center">
                <motion.div className="absolute inset-0 z-0" style={{ y: parallaxY }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 dark:opacity-50"></div>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </motion.div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
                        Poornima University Seminar Booking System
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-800 dark:text-gray-300">
                        Seamlessly book, manage, and organize your events at our state-of-the-art facilities.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to={isAdmin ? "/admin" : "/booking"}
                                className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                            >
                                {isAdmin ? "Go to Dashboard" : "Request a Seminar Hall"}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};