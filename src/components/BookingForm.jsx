    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { ArrowLeft, CheckCircle } from 'lucide-react';

    export default function BookingForm({ currentUser, details, goBack, onSubmit, selectedHall, capacity }) {
        const [isGuestLecture, setIsGuestLecture] = useState(false);
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [errors, setErrors] = useState({});

        const validateForm = (formData) => {
            const newErrors = {};
            if (!formData.get('organiserName')) newErrors.organiserName = 'Full Name is required';
            if (!formData.get('email')) newErrors.email = 'Email is required';
            if (!formData.get('designation')) newErrors.designation = 'Designation is required';
            if (!formData.get('department')) newErrors.department = 'Department is required';
            if (!formData.get('title')) newErrors.title = 'Event Title is required';
            if (!formData.get('purpose')) newErrors.purpose = 'Purpose is required';

            const attendees = parseInt(formData.get('expectedAttendees'), 10);
            if (isNaN(attendees) || attendees <= 0) {
                newErrors.expectedAttendees = 'Valid number of attendees is required';
            } else if (attendees > capacity) {
                newErrors.expectedAttendees = `Attendees cannot exceed hall capacity (${capacity})`;
            }

            if (isGuestLecture) {
                if (!formData.get('guestName')) newErrors.guestName = 'Guest Name is required';
                if (!formData.get('guestDetails')) newErrors.guestDetails = 'Guest Details are required';
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);

            if (!validateForm(formData)) {
                const firstErrorField = document.querySelector('.error-message');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            const newBooking = {
                id: Date.now(),
                title: formData.get('title'),
                hall: selectedHall,
                date: details.date,
                startTime: details.startTime,
                endTime: details.endTime,
                status: 'pending',
                requestedBy: formData.get('organiserName'),
                email: formData.get('email'),
                designation: formData.get('designation'),
                department: formData.get('department'),
                phone: formData.get('phone'),
                purpose: formData.get('purpose'),
                expectedAttendees: parseInt(formData.get('expectedAttendees'), 10),
                thumbnailUrl: formData.get('thumbnailUrl') || null,
                isInviteOnly: formData.get('isInviteOnly') === 'on',
                guestName: isGuestLecture ? formData.get('guestName') : null,
                guestDetails: isGuestLecture ? formData.get('guestDetails') : null,
                adminNotes: ""
            };
            onSubmit(newBooking);
            setIsSubmitted(true);
        };

        if (isSubmitted) {
            return (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                    <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                    <p className="text-gray-600 dark:text-gray-400">Your request has been sent for admin approval. You can check its status on the "My Bookings" page.</p>
                    <button
                        onClick={() => {
                            setIsSubmitted(false);
                            goBack();
                        }}
                        className="mt-6 bg-indigo-600 text-white font-bold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Book Another Hall
                    </button>

                </motion.div>
            );
        }

        const inputClasses = "w-full mt-1 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500";
        const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";
        const errorMessageClasses = "text-red-500 text-xs mt-1 error-message";

        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl"
            >
                <div className="flex items-center mb-6">
                    <button
                        type="button"
                        onClick={() => {
                            setIsSubmitted(false); // optional: reset form state if needed
                            goBack();
                        }}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-2xl font-bold">Book {selectedHall}</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="organiserName" className={labelClasses}>Full Name</label>
                            <input id="organiserName" name="organiserName" type="text" defaultValue={currentUser?.name} required className={inputClasses} />
                            {errors.organiserName && <p className={errorMessageClasses}>{errors.organiserName}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className={labelClasses}>Email</label>
                            <input id="email" name="email" type="email" defaultValue={currentUser?.email} required className={inputClasses} />
                            {errors.email && <p className={errorMessageClasses}>{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="designation" className={labelClasses}>Designation</label>
                            <input id="designation" name="designation" type="text" defaultValue={currentUser?.designation} required className={inputClasses} />
                            {errors.designation && <p className={errorMessageClasses}>{errors.designation}</p>}
                        </div>
                        <div>
                            <label htmlFor="department" className={labelClasses}>Department</label>
                            <input id="department" name="department" type="text" defaultValue={currentUser?.department} required className={inputClasses} />
                            {errors.department && <p className={errorMessageClasses}>{errors.department}</p>}
                        </div>
                    </div>
                    <hr className="dark:border-gray-600" />
                    <div>
                        <label htmlFor="title" className={labelClasses}>Event Title</label>
                        <input id="title" name="title" type="text" required className={inputClasses} />
                        {errors.title && <p className={errorMessageClasses}>{errors.title}</p>}
                    </div>
                    <div>
                        <label htmlFor="purpose" className={labelClasses}>Purpose of Event</label>
                        <textarea id="purpose" name="purpose" rows="3" required className={inputClasses} placeholder="Describe the main objective and agenda of your event..."></textarea>
                        {errors.purpose && <p className={errorMessageClasses}>{errors.purpose}</p>}
                    </div>
                    <div>
                        <label htmlFor="expectedAttendees" className={labelClasses}>Expected Attendees (Capacity: {capacity})</label>
                        <input id="expectedAttendees" name="expectedAttendees" type="number" min="1" required className={inputClasses} />
                        {errors.expectedAttendees && <p className={errorMessageClasses}>{errors.expectedAttendees}</p>}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <input id="guest-check" type="checkbox" checked={isGuestLecture} onChange={() => setIsGuestLecture(!isGuestLecture)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="guest-check" className={labelClasses}>Is this a guest lecture?</label>
                    </div>
                    {isGuestLecture && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                        >
                            <div>
                                <label htmlFor="guestName" className={labelClasses}>Guest Name</label>
                                <input id="guestName" name="guestName" placeholder="Name of the guest speaker" className={inputClasses} />
                                {errors.guestName && <p className={errorMessageClasses}>{errors.guestName}</p>}
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="guestDetails" className={labelClasses}>About the Guest</label>
                                <textarea id="guestDetails" name="guestDetails" placeholder="Brief details about the guest" rows="2" className={`${inputClasses} md:col-span-2`}></textarea>
                                {errors.guestDetails && <p className={errorMessageClasses}>{errors.guestDetails}</p>}
                            </div>
                        </motion.div>
                    )}

                    <div className="flex items-center gap-2 mt-4">
                        <input id="invite-check" name="isInviteOnly" type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="invite-check" className={labelClasses}>This is an invite-only event.</label>
                    </div>

                    <div className="pt-4 border-t dark:border-gray-600">
                        <button type="submit" className="w-full mt-4 py-3 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                            Submit Request
                        </button>
                    </div>
                </form>
            </motion.div>
        );
    }