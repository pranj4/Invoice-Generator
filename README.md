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

## PROJECT DEMO


![Demo](https://github.com/user-attachments/assets/370ea1d2-c8f8-4547-9bf6-44c769a7bd78)

![demo2](https://github.com/user-attachments/assets/66ac759d-b9c0-4c03-8d08-50e9b06361ec)

![demo3](https://github.com/user-attachments/assets/94166712-8924-43bd-adc8-fde49a248fde)




# SAMPLE INVOICE OUTPUT

<img width="852" height="898" alt="image" src="https://github.com/user-attachments/assets/b2caa396-dcb8-48d3-8e6b-3b8b56b77492" />



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



---

## 📤 Deployment
- **Frontend**: [Vercel](invoice-generator-fry6wh8qo-pranjals-projects-f57b5a0c.vercel.app)
- **Backend**: [Render](https://invoice-generator-0z8g.onrender.com)

---


