# 🏥 Hospital Management System - Frontend

This is the **frontend** of the Hospital Management System, built using **React.js, Tailwind CSS, and React Router**.
It allows users to **view hospital details**, while **admins can manage hospitals (Add, Edit, Delete)**.

---

## 🌟 Features
✅ **Home Page with Hospital Listings**  
✅ **Search & Filter Hospitals by City & Speciality**  
✅ **View Detailed Hospital Information**  
✅ **Admin Dashboard for Managing Hospitals**  
✅ **Add, Edit, and Delete Hospitals (Admin Only)**  
✅ **Authentication using Cookies (Admin Login/Signup)**  
✅ **Fully Responsive Design**  

---

## 🚀 Tech Stack
- **Frontend:** React.js, Tailwind CSS, React Router
- **State Management:** useState, useEffect
- **Notifications:** React Toastify
- **Auth Handling:** Cookies for Admin Authentication
- **Image Preview Modal:** react-modal

---

## 📂 Folder Structure
```
📦 frontend
 ├── eslint.config.js
 ├── index.html
 ├── package.json
 ├── pnpm-lock.yaml
 ├── public
 │   └── hospital.png
 ├── README.md
 ├── src
 │   ├── admin
 │   │   ├── AddHospital.jsx
 │   │   ├── AdminDashboard.jsx
 │   │   └── EditHospital.jsx
 │   ├── App.css
 │   ├── App.jsx
 │   ├── assets
 │   │   └── react.svg
 │   ├── auth
 │   │   ├── AuthContext.jsx
 │   │   ├── ProtectedRoute.jsx
 │   │   ├── Signin.jsx
 │   │   ├── SignoutButton.jsx
 │   │   └── Signup.jsx
 │   ├── components
 │   │   ├── Navbar.jsx
 │   │   └── SearchFilter.jsx
 │   ├── data
 │   │   └── constants.js
 │   ├── global.css
 │   ├── main.jsx
 │   └── pages
 │       ├── Home.jsx
 │       └── HospitalDetails.jsx
 └── vite.config.js
```

---

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/rishiyaduwanshi/hospitalHubFrontend.git
cd hospital-frontend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run Frontend Locally**
```sh
npm run dev
```
🚀 **The app will be available at:** `http://localhost:5173`

---

## 🔗 API Configuration
To connect with the backend, create a **.env file** in the root directory and add:
```env
VITE_API_BASE_URL=http://localhost:2622/api/v1.0.0
```

## 🤝 Contributing
Pull requests are welcome! If you find any issues, feel free to open an issue or contribute to the project.

---

## 📝 License
This project is open-source and available under the **MIT License**.

