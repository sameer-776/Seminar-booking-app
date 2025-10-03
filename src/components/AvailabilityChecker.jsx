// src/components/AvailabilityChecker.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// This sub-component now has its full implementation
const TimeSlots = ({ date, bookingsForDate, onSelect, onBack, selectedHall }) => {
    const slots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const isSlotBooked = (slot) => {
        return bookingsForDate.some(b => b.hall === selectedHall && b.startTime <= slot && b.endTime > slot && b.status !== 'rejected');
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        setEndTime(''); // Reset end time when start time changes
    };

    const getAvailableEndTimes = () => {
        if (!startTime) return [];
        const startIndex = slots.indexOf(startTime);
        const available = [];
        for (let i = startIndex; i < slots.length; i++) {
            if (isSlotBooked(slots[i])) {
                break;
            }
            const endTimeValue = (i + 1 < slots.length) ? slots[i + 1] : `${parseInt(slots[i].split(':')[0]) + 1}:00`;
            available.push({ label: `${slots[i]} - ${endTimeValue}`, value: endTimeValue });
        }
        return available;
    };
    const formatDate = (d) => d.toISOString().split('T')[0];

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:max-w-xs bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <h4 className="font-bold text-center mb-4">{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <select value={startTime} onChange={handleStartTimeChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Select start time</option>
                        {slots.map(slot => <option key={slot} value={slot} disabled={isSlotBooked(slot)}>{slot}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <select value={endTime} onChange={e => setEndTime(e.target.value)} disabled={!startTime} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Select end time</option>
                        {getAvailableEndTimes().map(et => <option key={et.value} value={et.value}>{et.label}</option>)}
                    </select>
                </div>
                <button onClick={() => onSelect(formatDate(date), startTime, endTime)} disabled={!startTime || !endTime} className="w-full mt-2 py-2 px-4 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Confirm & Request</button>
            </div>
        </motion.div>
    );
};


export default function AvailabilityChecker({ bookings, onSlotSelect, selectedHall, goBack }) {
    const [date, setDate] = useState(new Date(2025, 9, 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const days = [...Array(daysInMonth).keys()];
    const blanks = [...Array(firstDayOfMonth).keys()];
    const formatDate = (d) => d.toISOString().split('T')[0];

    const getDayStatus = (dayDate) => {
        const bookingsOnDay = bookings[formatDate(dayDate)]?.filter(b => b.hall === selectedHall && b.status !== 'rejected') || [];
        if (bookingsOnDay.length === 0) {
            return 'bg-green-100 dark:bg-green-900/50 hover:bg-green-200 text-green-800 dark:text-green-300'; // Available
        }
        const hasPending = bookingsOnDay.some(b => b.status === 'pending');
        if (hasPending) {
            return 'bg-yellow-100 dark:bg-yellow-900/50 hover:bg-yellow-200 text-yellow-800 dark:text-yellow-300'; // Pending
        }
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'; // Booked
    };

    return (
        <motion.div key="calendar-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} >
            <button onClick={goBack} className="text-sm mb-4 text-indigo-500 hover:underline">&larr; Change Hall</button>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">2. Check Availability for <span className="text-indigo-500">{selectedHall}</span></h2>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>&lt;</button>
                        <h3 className="text-xl font-bold">{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h3>
                        <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>&gt;</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <div key={i} className="font-semibold text-xs sm:text-sm">{day}</div>)}
                        {blanks.map(b => <div key={`b-${b}`}></div>)}
                        {days.map(day => {
                            const dayDate = new Date(date.getFullYear(), date.getMonth(), day + 1);
                            const dayStatusClass = getDayStatus(dayDate);
                            const isSelected = selectedDate && formatDate(dayDate) === formatDate(selectedDate);
                            return (
                                <div key={day} onClick={() => setSelectedDate(dayDate)}
                                    className={`p-2 rounded-lg cursor-pointer transition-colors text-sm ${isSelected ? 'ring-2 ring-indigo-500' : ''} ${dayStatusClass}`}>
                                    {day + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {selectedDate && <TimeSlots date={selectedDate} bookingsForDate={bookings[formatDate(selectedDate)] || []} onSelect={onSlotSelect} onBack={() => setSelectedDate(null)} selectedHall={selectedHall} />}
            </div>
        </motion.div>
    );
};