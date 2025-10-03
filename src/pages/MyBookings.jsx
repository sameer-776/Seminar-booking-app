import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { RefreshCw, Edit, Trash2, Info, AlertTriangle } from 'lucide-react'; // Corrected icon name
import BookingDetailsModal from '../components/BookingDetailsModal.jsx';
import EditBookingModal from '../components/EditBookingModal.jsx';

export default function MyBookings({ allBookings, currentUser, handleUpdateBookingStatus, handleEditBooking }) {
    const [detailsModalData, setDetailsModalData] = useState(null);
    const [editModalData, setEditModalData] = useState(null);

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    const myBookings = allBookings.filter(booking => booking.requestedBy === currentUser.name);

    const getStatusChip = (status) => {
        switch (status) {
            case 'booked': return 'bg-green-200 text-green-800';
            case 'pending': return 'bg-yellow-200 text-yellow-800';
            case 'rejected': return 'bg-red-200 text-red-800';
            case 'cancelled': return 'bg-gray-400 text-white';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 pb-12 md:pb-24">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">My Booking Requests</h1>
                {myBookings.length > 0 ? (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {myBookings.map(booking => (
                            <motion.div key={booking.id} layout className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div className="flex-grow">
                                        <h2 className="font-bold text-lg">{booking.title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.hall} on {booking.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-3 sm:mt-0 flex-shrink-0">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusChip(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                        <button onClick={() => setDetailsModalData(booking)} title="View Details" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Info size={16}/></button>
                                        {booking.status === 'pending' && (
                                            <button onClick={() => setEditModalData(booking)} title="Edit" className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"><Edit size={16} className="text-blue-600"/></button>
                                        )}
                                        {booking.status !== 'rejected' && booking.status !== 'cancelled' && (
                                            <button onClick={() => handleUpdateBookingStatus(booking.date, booking.id, 'cancelled')} title="Cancel" className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900"><Trash2 size={16} className="text-red-600"/></button>
                                        )}
                                    </div>
                                </div>
                                {booking.originalHall && booking.originalHall !== booking.hall && (
                                    <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md text-xs text-blue-800 dark:text-blue-200 flex items-center gap-2">
                                        <RefreshCw size={14} />
                                        <span>Admin has re-assigned this booking from <strong>{booking.originalHall}</strong>.</span>
                                    </div>
                                )}
                                {booking.status === 'rejected' && booking.rejectionReason && (
                                    <div className="mt-3 pt-3 border-t dark:border-gray-700">
                                        <p className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                                            <AlertTriangle size={14} /> {/* Corrected icon name */}
                                            Admin's Reason:
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
                                            "{booking.rejectionReason}"
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : ( <p className="text-center text-gray-500">You have not made any booking requests yet.</p> )}
            </motion.div>
            <AnimatePresence>
                {detailsModalData && <BookingDetailsModal booking={detailsModalData} onClose={() => setDetailsModalData(null)} />}
                {editModalData && <EditBookingModal booking={editModalData} onClose={() => setEditModalData(null)} onSave={handleEditBooking} />}
            </AnimatePresence>
        </>
    );
}