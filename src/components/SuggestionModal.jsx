import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { SEMINAR_HALLS } from '../data.js';

export default function SuggestionModal({ booking, allBookings, onClose, onApproveWithChange }) {

    const findAvailableHalls = () => {
        const busyHalls = allBookings
            .filter(b => 
                b.status === 'booked' && 
                b.date === booking.date && 
                b.startTime < booking.endTime && 
                b.endTime > booking.startTime
            )
            .map(b => b.hall);
        
        return SEMINAR_HALLS.filter(hall => !busyHalls.includes(hall));
    };

    const availableHalls = findAvailableHalls();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Re-allocate Seminar Hall</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 p-3 rounded-md mb-4 text-sm">
                    <p><strong>Event:</strong> {booking.title}</p>
                    <p><strong>Original Request:</strong> {booking.hall}</p>
                    <p><strong>Time:</strong> {booking.date} @ {booking.startTime}-{booking.endTime}</p>
                </div>
                
                <h3 className="font-semibold mb-2">Select a different available hall:</h3>
                {availableHalls.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {availableHalls.map(hall => (
                            <div key={hall} className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                                <span>{hall}</span>
                                <button onClick={() => onApproveWithChange(booking, hall)} className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-green-600">Approve & Assign</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center p-4 bg-gray-100 dark:bg-gray-700 rounded-md">No alternative halls available at this time.</p>
                )}
            </motion.div>
        </motion.div>
    );
};