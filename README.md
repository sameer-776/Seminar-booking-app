# 🎓 Seminar Hall Booking System

A web application built with **React + Vite**, styled using **TailwindCSS**, and animated with **Framer Motion**.  
This project allows users to explore seminar halls, book them for events, and provides an admin dashboard to manage bookings.

---

## 📂 Project Structure

```
seminar-hall-booking/
│
├── src/
│   ├── App.jsx                # Main app entry with routes
│   ├── main.jsx               # React root
│   ├── index.css              # Tailwind CSS imports
│   ├── data.js                # Static hall & booking data
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── pages/                 # App pages
│       ├── HomePage.jsx
│       ├── BookingPage.jsx
│       └── AdminDashboard.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Prerequisites
Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

Check versions:
```bash
node -v
npm -v
```

---

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/seminar-hall-booking.git
cd seminar-hall-booking
```

---

### 3️⃣ Install Dependencies
```bash
npm install
```
or (if you prefer yarn):
```bash
yarn install
```

---

### 4️⃣ Run the Development Server
```bash
npm run dev
```

Vite will start a local dev server (default: [http://localhost:5173](http://localhost:5173)).

---

### 5️⃣ Build for Production
To create an optimized build:
```bash
npm run build
```

Preview the build locally:
```bash
npm run preview
```

---

## 🎨 Tech Stack

- ⚛️ **React 18 + Vite** – Fast modern frontend tooling  
- 🎨 **TailwindCSS** – Utility-first styling  
- 🎬 **Framer Motion** – Smooth animations  
- 🛠 **React Router DOM** – Page navigation  

---

## 🚀 Features

- 📌 Browse available seminar halls  
- 📝 Book halls for seminars or conferences  
- 📊 Admin dashboard with booking status (booked, pending, rejected)  
- 🌗 Dark mode support  

---

## 🧑‍💻 Development Notes

- Components are modular (`Navbar`, `Footer`, etc.)  
- Pages are organized inside `/src/pages/`  
- Static data is stored in `src/data.js` (can later be replaced with an API)  

---

## 📝 License
This project is open-source and free to use for educational purposes.
