# 🧾 Invoice Generator - MERN Stack (MongoDB, Express, React, Node.js)

A full-stack web application that allows users to:
- Register/Login securely
- Add multiple products with price and quantity
- Auto-calculate GST and totals
- Generate and download beautiful PDF invoices

---

## 🔧 Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS + Shadcn/UI
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **PDF Generation**: Puppeteer

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login/Register)
- 🛒 Add/Edit Product List
- 📄 Auto GST (18%) calculation
- 📥 Generate Invoice in PDF format
- 🎨 Fully Responsive & Styled per Figma

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/invoice-generator.git
cd invoice-generator
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGO_URI=your_mongo_db_url
JWT_SECRET=your_secret_key
```

Start backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

---

## 📄 Sample Invoice
![Invoice Screenshot](./assets/invoice-sample.png)

---

## 📤 Deployment
- **Frontend**: [Vercel](https://vercel.com)
- **Backend**: [Render](https://render.com)

---


