# 🏪 StoreRatings

A full-stack **Store Ratings** web application where users can register, rate stores, store owners can view ratings, and admins can manage stores and users.

---

## 🌐 Live Links

- **Frontend (Vercel)**:  
  https://store-ratings-delta.vercel.app

- **Backend API (Railway)**:  
  https://storeratings-production.up.railway.app/api

---

## 🧪 Demo Login Credentials

| Role | Email | Password |
|----|------|---------|
| **Admin** | admin@gmail.com | Admin@123 |
| **User** | user@gmail.com | User@1234 |
| **Store Owner** | store@gmail.com | Store@123 |

> ⚠️ These credentials are for demo/testing purposes only.

---

## 🧩 Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MySQL (Aiven – Free Tier)
- JWT Authentication
- bcrypt

### Deployment
- **Frontend**: Vercel
- **Backend**: Railway
- **Database**: Aiven MySQL (Asia-Pacific)

---

## 🔐 Authentication & Roles

The application supports **three roles**:

1. **System Admin**
2. **Normal User**
3. **Store Owner**

Role-based access control is implemented on both frontend and backend.

---

## ✨ Features

### 👑 Admin
- Dashboard with total users, stores, and ratings
- Add new users (Admin / User / Store Owner)
- Add new stores using store owner email
- View and filter users by name, email, address, and role
- View and filter stores by name, email, and address

### 👤 User
- Register & login
- View all stores
- Submit ratings for stores
- View own submitted ratings

### 🏬 Store Owner
- Login
- View ratings of their assigned store

---

## 🗄️ Database Schema (MySQL)

### Users Table
- id
- name
- email
- password (hashed)
- address
- role
- created_at

### Stores Table
- id
- name
- address
- owner_email
- created_at

### Ratings Table
- id
- user_id
- store_id
- rating
- created_at

---

## ⚙️ Environment Variables (Backend)

```env
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=defaultdb
DB_SSL=true

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
