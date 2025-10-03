// src/components/Footer.jsx

import React from 'react';

const developers = [
  { name: 'Sameer', details: '17768 - B.Tech AIML', linkedin: 'https://www.linkedin.com/in/sameer-beniwal/' },
  { name: 'Kshitij Soni', details: '18810 - BCA', linkedin: 'http://www.linkedin.com/in/kshitijsoni07' },
  { name: 'Aryan Gaikwad', details: '18800 - B.Tech AIML', linkedin: 'https://www.linkedin.com/in/aryan-semunal-gaikwad/' },
  { name: 'Mohit Kumar', details: '19405 - BCA', linkedin: 'https://www.linkedin.com/in/mohit-kumar-00bb50202/' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900 dark:text-white">Developed by - Team Sunya</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-gray-800 dark:text-gray-300">
          {developers.map((dev) => (
            <a
              key={dev.name}
              href={dev.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border border-gray-300 dark:border-gray-600 rounded-lg no-underline transition-all duration-300 hover:shadow-[0_8px_30px_rgb(99,102,241,0.3)] hover:-translate-y-1"
            >
              <p className="font-semibold text-base sm:text-lg text-gray-900 dark:text-white">{dev.name}</p>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{dev.details}</p>
            </a>
          ))}
        </div>
        <div className="mt-8 sm:mt-10">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">Under the supervision of <strong>Dr. Vipin Khattri</strong></p>
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-700 py-4">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Poornima University. All Rights Reserved.</p>
      </div>
    </footer>
  );
}