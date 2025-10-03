import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function BookingForm({ currentUser, details, goBack, onSubmit, selectedHall, capacity }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = (formData) => {
        const newErrors = {};
        if (!formData.get('title').trim()) newErrors.title = "Event title is required.";
        if (!formData.get('organiserName').trim()) newErrors.organiserName = "Organiser name is required.";
        if (!formData.get('department').trim()) newErrors.department = "Department is required.";
        if (!formData.get('purpose').trim()) newErrors.purpose = "Purpose of the event is required.";

        const attendees = formData.get('expectedAttendees');
        if (!attendees || parseInt(attendees, 10) <= 0) {
            newErrors.expectedAttendees = "Please enter a valid number of attendees (must be > 0).";
        }
        // --- THIS IS THE CAPACITY CHECK ---
        else if (parseInt(attendees, 10) > capacity) {
            newErrors.expectedAttendees = `Attendees cannot exceed the hall capacity of ${capacity}.`;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (!validateForm(formData)) return;

        const newBooking = {
            id: Date.now(),
            title: formData.get('title'),
            hall: selectedHall,
            date: details.date,
            startTime: details.startTime,
            endTime: details.endTime,
            status: 'pending',
            requestedBy: formData.get('organiserName'),
            department: formData.get('department'),
            purpose: formData.get('purpose'),
            expectedAttendees: formData.get('expectedAttendees'),
            additionalRequirements: formData.get('additionalRequirements')
        };
        onSubmit(newBooking);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                <p className="text-gray-600 dark:text-gray-400">Your request has been sent for admin approval. You will be notified upon confirmation.</p>
                <button onClick={goBack} className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors">Book Another Slot</button>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
            <button onClick={goBack} className="text-sm mb-4 text-indigo-500 hover:underline">&larr; Back to Availability</button>
            <h2 className="text-3xl font-bold mb-2">Request: {selectedHall}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Booking for: <span className="font-semibold text-indigo-500">{details.date} from {details.startTime} to {details.endTime}</span></p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <input name="title" type="text" required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Organiser Name</label>
                    <input name="organiserName" type="text" defaultValue={currentUser?.name} required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.organiserName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                    {errors.organiserName && <p className="text-red-500 text-xs mt-1">{errors.organiserName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Organising Department</label>
                    <input name="department" type="text" defaultValue={currentUser?.department} required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.department ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Expected No. of Attendees (Capacity: {capacity})</label>
                    <input name="expectedAttendees" type="number" required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.expectedAttendees ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                    {errors.expectedAttendees && <p className="text-red-500 text-xs mt-1">{errors.expectedAttendees}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Purpose</label>
                    <textarea name="purpose" required rows="3" className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.purpose ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}></textarea>
                    {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Additional Requirements (Optional)</label>
                    <textarea name="additionalRequirements" rows="3" placeholder="e.g., podium, specific mic types" className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"></textarea>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <button type="submit" className="w-full mt-4 py-3 px-4 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Submit Request</button>
                </motion.div>
            </form>
        </motion.div>
    );
};