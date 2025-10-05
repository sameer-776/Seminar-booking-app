import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode, isUserLoggedIn, currentUser, onLogout, onLoginClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/facilities', label: 'Facilities' },
        { to: '/booking', label: 'Booking' },
    ];

    // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileRef]);

    const NavLinkComponent = ({ to, label }) => (
        <NavLink to={to} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `relative font-medium tracking-wide transition-colors duration-300 w-full text-left md:w-auto md:text-center px-4 py-2 md:p-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && ( <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500" layoutId="underline" initial={false} transition={{ type: 'spring', stiffness: 500, damping: 30 }} /> )}
                </>
            )}
        </NavLink>
    );

    return (
        <header className="sticky top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo.png" alt="University Logo" className="h-10" />
                        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                            <span className="hidden sm:inline">Poornima University</span><span className="sm:hidden">P.U. Booking</span>
                        </div>
                    </Link>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => <NavLinkComponent key={item.to} {...item} />)}
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="hidden sm:block">
                        {isUserLoggedIn ? (
                            <div className="relative" ref={profileRef}>
                                {currentUser.role === 'admin' ? (
                                    <div className="flex items-center gap-2">
                                        <Link to="/admin" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-purple-700">Dashboard</Link>
                                        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600">Logout</button>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold">
                                        {currentUser.name}
                                        <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                )}
                                <AnimatePresence>
                                {isProfileOpen && currentUser.role === 'user' && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50">
                                        <Link to="/my-bookings" onClick={() => setIsProfileOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Bookings</Link>
                                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">My Profile</Link>
                                        <hr className="my-1 dark:border-gray-600" />
                                        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <button onClick={onLoginClick} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700">Login</button>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg overflow-hidden">
                        <ul className="flex flex-col items-start space-y-2 p-4">
                            {navItems.map(item => <li key={item.to} className="w-full"><NavLinkComponent {...item} /></li>)}
                            {isUserLoggedIn && currentUser?.role === 'user' && <li className="w-full"><NavLinkComponent to="/my-bookings" label="My Bookings" /></li>}
                            {isUserLoggedIn && currentUser?.role === 'user' && <li className="w-full"><NavLinkComponent to="/profile" label="My Profile" /></li>}
                            <li className="w-full pt-2">
                                {isUserLoggedIn ? (
                                    currentUser.role === 'admin' ? (
                                        <div className="w-full flex flex-col gap-2">
                                            <button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} className="w-full bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-semibold">Dashboard</button>
                                            <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold">Logout</button>
                                        </div>
                                    ) : ( <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold">Logout</button> )
                                ) : (
                                    <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold">Login</button>
                                )}
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}