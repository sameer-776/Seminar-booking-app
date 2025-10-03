import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function BookingDetailsModal({ booking, onClose, onSaveNote, currentUser }) {
    if (!booking) return null;

    const handleSaveNote = (e) => {
        e.preventDefault();
        const note = e.target.adminNotes.value;
        onSaveNote(booking.id, booking.date, note);
        // We can optionally close the modal after saving, or leave it open
        // onClose(); 
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 pb-2 border-b dark:border-gray-600">
                    <h2 className="text-xl font-bold">{booking.title}</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                
                {/* --- THIS IS THE MISSING DETAILS SECTION --- */}
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <p><strong>Status:</strong> <span className="font-semibold capitalize">{booking.status}</span></p>
                    <p><strong>Hall:</strong> {booking.hall}</p>
                    <p><strong>Date & Time:</strong> {booking.date} from {booking.startTime} to {booking.endTime}</p>
                    <hr className="dark:border-gray-700 my-2"/>
                    <p><strong>Requester:</strong> {booking.requestedBy}</p>
                    <p><strong>Department:</strong> {booking.department}</p>
                    <p><strong>Attendees:</strong> {booking.expectedAttendees}</p>
                    <p><strong>Purpose:</strong> {booking.purpose || 'Not specified'}</p>
                    {booking.additionalRequirements && <p><strong>Requirements:</strong> {booking.additionalRequirements}</p>}
                </div>
                {/* ------------------------------------------- */}

                {currentUser?.role === 'admin' && (
                    <div className="mt-4 pt-4 border-t dark:border-gray-600">
                        <h3 className="text-lg font-bold mb-2">Admin Notes</h3>
                        <form onSubmit={handleSaveNote}>
                            <textarea
                                name="adminNotes"
                                rows="3"
                                defaultValue={booking.adminNotes}
                                className="w-full p-2 border rounded bg-transparent dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                                placeholder="Add internal notes..."
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button type="submit" className="px-4 py-2 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700">Save Note</button>
                            </div>
                        </form>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}