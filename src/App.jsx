import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import data from './bookings.json';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';
import Home from './pages/Home.jsx';
import Facilities from './pages/Facilities.jsx';
import Booking from './pages/Booking.jsx';
import Admin from './pages/Admin.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Analytics from './pages/Analytics.jsx';
import UserManagementPage from './pages/UserManagementPage.jsx';

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [bookings, setBookings] = useState(data.initialBookings);
    const [users, setUsers] = useState(data.users);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    const handleLoginSuccess = (user) => {
        setIsUserLoggedIn(true);
        setCurrentUser(user);
        setShowLogin(false);
        if (user.role === 'admin') navigate('/admin');
    };

    const handleLogout = () => {
        setIsUserLoggedIn(false);
        setCurrentUser(null);
        navigate('/');
    };

    const handleAddNewUser = (newUser) => setUsers([...users, newUser]);
    const handleDeleteUser = (userId) => setUsers(users.filter(u => u.id !== userId));

    const handleUpdateAdminNote = (bookingId, date, newNote) => {
        const updatedBookingsOnDate = bookings[date]?.map(b => 
            b.id === bookingId ? { ...b, adminNotes: newNote } : b
        );
        if (updatedBookingsOnDate) setBookings({ ...bookings, [date]: updatedBookingsOnDate });
    };

    const handleBookingRequest = (newBooking) => {
        const date = newBooking.date;
        const updatedBookingsOnDate = bookings[date] ? [...bookings[date], newBooking] : [newBooking];
        setBookings({ ...bookings, [date]: updatedBookingsOnDate });
    };

    const handleUpdateBookingStatus = (date, bookingId, newStatus, newHall = null, reason = null) => {
        const updatedBookingsOnDate = bookings[date]?.map(b => {
            if (b.id === bookingId) {
                const updatedBooking = { ...b, status: newStatus };
                if (newHall && b.hall !== newHall) updatedBooking.originalHall = b.hall; updatedBooking.hall = newHall;
                if (newStatus === 'rejected' && reason) updatedBooking.rejectionReason = reason;
                return updatedBooking;
            }
            return b;
        });
        if (updatedBookingsOnDate) setBookings({ ...bookings, [date]: updatedBookingsOnDate });
    };
    
    const handleEditBooking = (editedBooking) => {
        const { date, id } = editedBooking;
        const updatedBookingsOnDate = bookings[date]?.map(b => (b.id === id ? editedBooking : b));
        if (updatedBookingsOnDate) setBookings({ ...bookings, [date]: updatedBookingsOnDate });
    };

    const allBookings = Object.entries(bookings).flatMap(([date, dateBookings]) => dateBookings.map(b => ({ ...b, date })));
    const pageProps = { isUserLoggedIn, currentUser, setShowLogin, bookings, users, handleBookingRequest, handleUpdateBookingStatus, handleEditBooking, handleAddNewUser, handleDeleteUser, handleUpdateAdminNote };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isUserLoggedIn={isUserLoggedIn} currentUser={currentUser} onLogout={handleLogout} onLoginClick={() => setShowLogin(true)} />
            <main className={`flex-grow ${location.pathname === '/' ? '' : 'pt-16'}`}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route index element={<Home currentUser={currentUser} />} />
                        <Route path="/facilities" element={<Facilities />} />
                        <Route path="/booking" element={<Booking {...pageProps} />} />
                        <Route path="/my-bookings" element={<MyBookings {...pageProps} allBookings={allBookings} />} />
                        <Route path="/admin" element={<Admin {...pageProps} />} />
                        <Route path="/analytics" element={<Analytics currentUser={currentUser} allBookings={allBookings} />} />
                        <Route path="/user-management" element={<UserManagementPage {...pageProps} />} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
            <AnimatePresence>
                {showLogin && (<LoginModal users={users} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />)}
            </AnimatePresence>
        </div>
    );
}