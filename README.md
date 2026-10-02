# Responsive Portfolio Website

A responsive, full-stack portfolio website for **K. Venkata Raviteja**, built with React, Vite, Express, and MongoDB.

## 🌐 Live Demo

**Portfolio Website:**  
https://client-xi-one-94.vercel.app

**Backend API:**  
https://cognevance-raviteja-portfolio.onrender.com

**API Health Check:**  
https://cognevance-raviteja-portfolio.onrender.com/api/health

The health endpoint confirms that the backend API is running and connected to MongoDB Atlas.

---

## ✨ Features

- Responsive portfolio website for desktop, tablet, and mobile
- Home, About, Skills, Projects, and Contact sections
- Responsive navigation with mobile menu
- Keyboard-accessible navigation
- Scroll-reveal animations
- Reduced-motion support for accessibility
- Full-stack contact form
- Server-side contact form validation
- Contact messages stored securely in MongoDB Atlas
- API rate limiting
- Helmet security headers
- Configurable CORS
- Production frontend deployment on Vercel
- Production backend deployment on Render
- MongoDB Atlas database integration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB
- MongoDB Atlas

### Deployment
- Vercel — Frontend
- Render — Backend API
- MongoDB Atlas — Database

---

## 📁 Project Structure

```text
cognevance_raviteja_portfolio/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── server/
│   ├── src/
│   │   ├── index.js
│   │   ├── models/
│   │   │   └── Contact.js
│   │   └── routes/
│   │       └── contact.js
│   ├── .env.example
│   ├── package.json
│   └── render.yaml
│
├── docs/
│   ├── DATABASE.md
│   ├── PROJECT_REPORT.md
│   └── screenshots/
│       ├── desktop.png
│       ├── mobile.png
│       └── README.txt
│
├── package.json
├── README.md
└── render.yaml