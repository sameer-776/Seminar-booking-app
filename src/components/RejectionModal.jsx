import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function RejectionModal({ onClose, onConfirm }) {
    const [reason, setReason] = useState('');

    const handleConfirm = () => {
        if (reason.trim()) {
            onConfirm(reason);
        }
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Reason for Rejection</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                <div className="space-y-4">
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows="4"
                        className="w-full p-2 border rounded bg-transparent dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        placeholder="Please provide a brief reason for rejecting this request..."
                    ></textarea>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={!reason.trim()}
                            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
                        >
                            Confirm Rejection
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}