import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode, isUserLoggedIn, currentUser, onLogout, onLoginClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/facilities', label: 'Facilities' },
        { to: '/booking', label: 'Booking' },
    ];

    const NavLinkComponent = ({ to, label }) => (
        <NavLink 
            to={to} 
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `relative font-medium tracking-wide transition-colors duration-300 w-full text-left md:w-auto md:text-center px-4 py-2 md:p-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}
        >
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && (
                        <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500"
                            layoutId="underline"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    )}
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
                            <span className="hidden sm:inline">Poornima University</span>
                            <span className="sm:hidden">P.U. Booking</span>
                        </div>
                    </Link>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => <NavLinkComponent key={item.to} {...item} />)}
                    {isUserLoggedIn && currentUser?.role === 'user' && <NavLinkComponent to="/my-bookings" label="My Bookings" />}
                    {isUserLoggedIn && currentUser?.role === 'admin' && (
                        <>
                            <NavLinkComponent to="/admin" label="Dashboard" />
                            <NavLinkComponent to="/analytics" label="Analytics" />
                            <NavLinkComponent to="/user-management" label="Users" />
                        </>
                    )}
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="hidden sm:block">
                        {isUserLoggedIn ? (
                            <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600">Logout</button>
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
                            {isUserLoggedIn && currentUser?.role === 'admin' && (
                                <>
                                    <li className="w-full"><NavLinkComponent to="/admin" label="Dashboard" /></li>
                                    <li className="w-full"><NavLinkComponent to="/analytics" label="Analytics" /></li>
                                    <li className="w-full"><NavLinkComponent to="/user-management" label="Users" /></li>
                                </>
                            )}
                            <li className="w-full pt-2">
                                {isUserLoggedIn ? (
                                    <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600">Logout</button>
                                ) : (
                                    <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700">Login</button>
                                )}
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}