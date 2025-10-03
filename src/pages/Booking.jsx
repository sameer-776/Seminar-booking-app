import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityChecker from '../components/AvailabilityChecker.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { SEMINAR_HALLS, HALL_FACILITIES } from '../data.js';

// The HallBookingFlow is now the main content of the page
const HallBookingFlow = ({ isUserLoggedIn, currentUser, setShowLogin, bookings, handleBookingRequest }) => {
    const [view, setView] = useState('select-hall');
    const [selectedHall, setSelectedHall] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleHallSelect = (hall) => {
        setSelectedHall(hall);
        setView('request');
    };

    const handleSlotSelect = (date, startTime, endTime) => {
        if (!isUserLoggedIn) {
            setBookingDetails({ date, startTime, endTime });
            setShowLogin(true);
        } else {
            setBookingDetails({ date, startTime, endTime });
            setView('form');
        }
    };

    useEffect(() => {
        if (isUserLoggedIn && bookingDetails && view !== 'form') {
            setView('form');
        }
    }, [isUserLoggedIn, bookingDetails, view]);

    const capacity = selectedHall ? HALL_FACILITIES[selectedHall]?.find(f => f.capacity)?.capacity || 300 : 300;

    return (
        <AnimatePresence mode="wait">
            {view === 'select-hall' && (
                <motion.div key="select-hall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">1. Select a Seminar Hall</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {SEMINAR_HALLS.map(hall => (
                            <button key={hall} onClick={() => handleHallSelect(hall)} className="p-6 text-left bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                                <h3 className="font-bold text-xl text-indigo-600 dark:text-indigo-400">{hall}</h3>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {view === 'request' && <AvailabilityChecker key="calendar" bookings={bookings} onSlotSelect={handleSlotSelect} selectedHall={selectedHall} goBack={() => setView('select-hall')} />}

            {view === 'form' && <BookingForm key="form" currentUser={currentUser} details={bookingDetails} goBack={() => setView('request')} onSubmit={handleBookingRequest} selectedHall={selectedHall} capacity={capacity} />}
        </AnimatePresence>
    );
};

// The main Booking page component is now much simpler
export default function Booking(props) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 pb-12 md:pb-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Book a Seminar Hall</h1>
            </div>
            <HallBookingFlow {...props} />
        </motion.div>
    );
};