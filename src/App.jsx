import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import data from './bookings.json';

// Import Layout & Components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';

// Import Pages
import Home from './pages/Home.jsx';
import Facilities from './pages/Facilities.jsx';
import Booking from './pages/Booking.jsx';
import Admin from './pages/Admin.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Analytics from './pages/Analytics.jsx';
import UserManagementPage from './pages/UserManagementPage.jsx';
import UserProfile from './pages/UserProfile.jsx';

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    // ✅ Load from localStorage first, fallback to JSON data
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem("bookings");
        return saved ? JSON.parse(saved) : data.initialBookings;
    });

    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem("users");
        return saved ? JSON.parse(saved) : data.users;
    });

    const location = useLocation();
    const navigate = useNavigate();

    // ✅ Persist to localStorage whenever users/bookings change
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem("bookings", JSON.stringify(bookings));
    }, [bookings]);

    // Theme switch
    useEffect(() => {
        if (isDarkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    // 🔐 Authentication
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

    // 👤 User updates
    const handleUpdateUser = (updatedUser) => {
        setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
        setCurrentUser(updatedUser);
    };

    const handleAddNewUser = (newUser) => {
        setUsers(prev => [...prev, newUser]);
        alert("✅ New user added and saved successfully!");
    };

    const handleDeleteUser = (userId) => setUsers(users.filter(u => u.id !== userId));

    const handleUpdateUserRole = (userId, newRole) => {
        setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)));
    };

    // 🗓️ Booking operations
    const handleUpdateAdminNote = (bookingId, date, newNote) => {
        const dateKey = new Date(date).toISOString().split('T')[0];
        const updatedBookingsOnDate = bookings[dateKey]?.map(b =>
            b.id === bookingId ? { ...b, adminNotes: newNote } : b
        );
        if (updatedBookingsOnDate) setBookings({ ...bookings, [dateKey]: updatedBookingsOnDate });
    };

    const handleBookingRequest = (newBooking) => {
        const date = newBooking.date;
        const updatedBookingsOnDate = bookings[date] ? [...bookings[date], newBooking] : [newBooking];
        setBookings({ ...bookings, [date]: updatedBookingsOnDate });
    };

    const handleUpdateBookingStatus = (date, bookingId, newStatus, newHall = null, reason = null) => {
        const dateKey = new Date(date).toISOString().split('T')[0];
        const updatedBookingsOnDate = bookings[dateKey]?.map(b => {
            if (b.id === bookingId) {
                const updatedBooking = { ...b, status: newStatus, rejectionReason: null };
                if (newHall && b.hall !== newHall) {
                    updatedBooking.originalHall = b.hall;
                    updatedBooking.hall = newHall;
                }
                if (newStatus === 'rejected' && reason) updatedBooking.rejectionReason = reason;
                if (newStatus === 'cancelled' && currentUser?.role === 'user')
                    updatedBooking.adminNotes = `Cancelled by user on ${new Date().toLocaleDateString()}.`;
                return updatedBooking;
            }
            return b;
        });
        if (updatedBookingsOnDate) setBookings({ ...bookings, [dateKey]: updatedBookingsOnDate });
    };

    const handleEditBooking = (editedBooking) => {
        const { date, id } = editedBooking;
        const dateKey = new Date(date).toISOString().split('T')[0];
        const updatedBookingsOnDate = bookings[dateKey]?.map(b => (b.id === id ? editedBooking : b));
        if (updatedBookingsOnDate) setBookings({ ...bookings, [dateKey]: updatedBookingsOnDate });
    };

    const allBookings = Object.entries(bookings).flatMap(([date, dateBookings]) =>
        dateBookings.map(b => ({ ...b, date }))
    );

    const pageProps = {
        isUserLoggedIn,
        currentUser,
        setShowLogin,
        bookings,
        users,
        handleBookingRequest,
        handleUpdateBookingStatus,
        handleEditBooking,
        handleAddNewUser,
        handleDeleteUser,
        handleUpdateAdminNote,
        handleUpdateUserRole
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                isUserLoggedIn={isUserLoggedIn}
                currentUser={currentUser}
                onLogout={handleLogout}
                onLoginClick={() => setShowLogin(true)}
            />

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
                        <Route path="/profile" element={<UserProfile currentUser={currentUser} onUpdateUser={handleUpdateUser} />} />
                    </Routes>
                </AnimatePresence>
            </main>

            <Footer />

            <AnimatePresence>
                {showLogin && (
                    <LoginModal
                        users={users}
                        onClose={() => setShowLogin(false)}
                        onLoginSuccess={handleLoginSuccess}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
