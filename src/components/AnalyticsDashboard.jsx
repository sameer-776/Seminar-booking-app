import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { SEMINAR_HALLS } from '../data.js';

export default function AnalyticsDashboard({ allBookings }) {
    // 1. Data for Bookings per Hall (Bar Chart)
    const bookingsByHall = SEMINAR_HALLS.map(hall => ({
        name: hall.replace(' seminar hall', '').replace(' Floor', ''),
        Bookings: allBookings.filter(b => b.hall === hall && b.status === 'booked').length,
    })).filter(data => data.Bookings > 0);

    // 2. Data for Bookings over Time (Line Chart)
    const bookingsByMonth = allBookings.reduce((acc, booking) => {
        const month = new Date(booking.date).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});
    const lineChartData = Object.keys(bookingsByMonth).map(month => ({
        month,
        Bookings: bookingsByMonth[month]
    }));

    // 3. Data for Department Usage (Bar Chart)
    const bookingsByDept = allBookings.reduce((acc, booking) => {
        const dept = booking.department || 'Unknown';
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
    }, {});
    const deptChartData = Object.keys(bookingsByDept).map(dept => ({
        name: dept,
        Requests: bookingsByDept[dept]
    }));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4">Bookings per Hall</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={bookingsByHall} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <XAxis dataKey="name" fontSize={12} interval={0} angle={-25} textAnchor="end" height={60} />
                        <YAxis allowDecimals={false} />
                        <Tooltip /> <Legend />
                        <Bar dataKey="Bookings" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                 <h3 className="text-xl font-bold mb-4">Booking Trends by Month</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip /> <Legend />
                        <Line type="monotone" dataKey="Bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow lg:col-span-2">
                 <h3 className="text-xl font-bold mb-4">Requests by Department</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={deptChartData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} fontSize={12} />
                        <Tooltip /> <Legend />
                        <Bar dataKey="Requests" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}