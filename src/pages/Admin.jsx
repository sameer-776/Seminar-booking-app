import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, BarChart2, Clock, CheckCircle, XCircle, Pencil, ShieldAlert } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import SuggestionModal from '../components/SuggestionModal.jsx';
import BookingDetailsModal from '../components/BookingDetailsModal.jsx';
import AnalyticsDashboard from '../components/AnalyticsDashboard.jsx';
import UserManagement from '../components/UserManagement.jsx';
import RejectionModal from '../components/RejectionModal.jsx';

const AdminDashboard = ({ currentUser, bookings, users, handleUpdateBookingStatus, handleAddNewUser, handleDeleteUser, handleUpdateAdminNote }) => {
    const [view, setView] = useState('requests');
    const [suggestionModalData, setSuggestionModalData] = useState(null);
    const [detailsModalData, setDetailsModalData] = useState(null);
    const [rejectionData, setRejectionData] = useState(null); // State for the new modal
    const [filter, setFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const allBookings = Object.entries(bookings).flatMap(([date, dateBookings]) => dateBookings.map(b => ({ ...b, date })));
    
    const filteredBookings = allBookings.filter(booking => {
        if (filter === 'All') return true;
        return booking.status === filter.toLowerCase();
    });

    const findClash = (pb) => allBookings.find(b => b.status === 'booked' && b.id !== pb.id && b.date === pb.date && b.startTime < pb.endTime && b.endTime > pb.startTime);
    
    const filterButtons = ['All', 'Pending', 'Booked', 'Rejected', 'Cancelled'];

    const pageCount = Math.ceil(filteredBookings.length / itemsPerPage);
    const currentItems = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 pb-12 md:pb-24">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Users} title="Total Bookings" value={allBookings.length} />
                <StatCard icon={Clock} title="Pending Requests" value={allBookings.filter(b => b.status === 'pending').length} />
                <StatCard icon={BarChart2} title="Booked Events" value={allBookings.filter(b => b.status === 'booked').length} />
                <StatCard icon={Users} title="Total Users" value={users.length} />
            </div>
            
            <div className="mb-6 flex justify-center border-b dark:border-gray-700">
                <button onClick={() => setView('requests')} className={`px-4 py-2 font-semibold ${view === 'requests' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-500'}`}>Booking Requests</button>
                <button onClick={() => setView('analytics')} className={`px-4 py-2 font-semibold ${view === 'analytics' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-500'}`}>Analytics</button>
                <button onClick={() => setView('users')} className={`px-4 py-2 font-semibold ${view === 'users' ? 'border-b-2 border-indigo-500 text-indigo-500' : 'text-gray-500'}`}>User Management</button>
            </div>

            <AnimatePresence mode="wait">
                {view === 'requests' && (
                    <motion.div key="requests" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
                            <div className="mb-6 flex items-center flex-wrap gap-2">
                                <span className="text-sm font-semibold text-gray-500 mr-2">Status:</span>
                                {filterButtons.map(s => (
                                    <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${filter === s ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{s}</button>
                                ))}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[640px]">
                                    <thead>
                                        <tr className="border-b dark:border-gray-700">
                                            <th className="p-3">Event</th><th className="p-3">Requester</th><th className="p-3">Date & Time</th>
                                            <th className="p-3">Status</th><th className="p-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((b) => (
                                            <tr key={b.id} onClick={() => setDetailsModalData(b)} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                                                <td className="p-3 font-semibold">{b.title}<div className="text-xs font-normal text-gray-500">{b.hall}</div></td>
                                                <td className="p-3">{b.requestedBy}<div className="text-xs text-gray-500">({b.department})</div></td>
                                                <td className="p-3 text-sm">{b.date}<div className="text-xs">{b.startTime}-{b.endTime}</div></td>
                                                <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${b.status === 'booked' ? 'bg-green-200 text-green-800' : b.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : b.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-gray-400 text-white'}`}>{b.status}</span></td>
                                                <td className="p-3" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                                                        {b.status === 'pending' && (
                                                            <>
                                                                <button title="Approve" onClick={() => handleUpdateBookingStatus(b.date, b.id, 'booked')} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50" disabled={!!findClash(b)}><CheckCircle size={16} /></button>
                                                                <button title="Reject" onClick={() => setRejectionData(b)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"><XCircle size={16} /></button>
                                                                <button title="Re-allocate Hall" onClick={() => setSuggestionModalData(b)} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><Pencil size={16} /></button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredBookings.length === 0 && <p className="text-center text-gray-500 py-8">No bookings found for the selected filter.</p>}
                            </div>
                            {pageCount > 1 && (
                                <div className="mt-6 flex justify-center items-center space-x-2">
                                    {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
                                        <button key={number} onClick={() => handlePageChange(number)} className={`px-3 py-1 text-sm rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>{number}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
                {view === 'analytics' && <motion.div key="analytics"><AnalyticsDashboard allBookings={allBookings} /></motion.div>}
                {view === 'users' && <motion.div key="users"><UserManagement users={users} onAddUser={handleAddNewUser} onDeleteUser={handleDeleteUser} /></motion.div>}
            </AnimatePresence>
            <AnimatePresence>
                {suggestionModalData && <SuggestionModal booking={suggestionModalData} allBookings={allBookings} onClose={() => setSuggestionModalData(null)} onApproveWithChange={(booking, newHall) => { handleUpdateBookingStatus(booking.date, booking.id, 'booked', newHall); setSuggestionModalData(null); }} />}
                {detailsModalData && <BookingDetailsModal booking={detailsModalData} onClose={() => setDetailsModalData(null)} onSaveNote={handleUpdateAdminNote} currentUser={currentUser} />}
                {rejectionData && <RejectionModal onClose={() => setRejectionData(null)} onConfirm={(reason) => { handleUpdateBookingStatus(rejectionData.date, rejectionData.id, 'rejected', null, reason); setRejectionData(null); }} />}
            </AnimatePresence>
        </motion.div>
    );
};

export default function Admin({ currentUser, ...props }) {
    if (currentUser?.role !== 'admin') {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center text-center p-4" style={{ minHeight: 'calc(100vh - 8rem)' }}>
                <div>
                    <ShieldAlert className="mx-auto h-16 w-16 text-red-500" />
                    <h1 className="mt-4 text-3xl font-bold">Access Denied</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">You must be logged in as an admin to view this page.</p>
                    <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700">Go to Homepage</Link>
                </div>
            </motion.div>
        );
    }
    return <AdminDashboard currentUser={currentUser} {...props} />;
}