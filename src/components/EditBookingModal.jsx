import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function EditBookingModal({ booking, onClose, onSave }) {
    if (!booking) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editedBooking = {
            ...booking,
            title: formData.get('title'),
            purpose: formData.get('purpose'),
            expectedAttendees: formData.get('expectedAttendees'),
            additionalRequirements: formData.get('additionalRequirements'),
        };
        onSave(editedBooking);
        onClose();
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Booking Request</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Event Title</label>
                        <input name="title" type="text" defaultValue={booking.title} required className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Expected No. of Attendees</label>
                        <input name="expectedAttendees" type="number" defaultValue={booking.expectedAttendees} required className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Purpose</label>
                        <textarea name="purpose" defaultValue={booking.purpose} required rows="3" className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Additional Requirements (Optional)</label>
                        <textarea name="additionalRequirements" defaultValue={booking.additionalRequirements} rows="2" className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700"></textarea>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Save Changes</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}