# **Freelanz – Freelancing Marketplace Platform**
A modern, full-stack freelancing marketplace where clients can post jobs, freelancers can apply, track progress, and manage their workspace through a beautiful dark dashboard.

---

## 🚀 **Live Demo**
### **Frontend (Vercel)**
🔗 https://freelancing-marketplace-21p0860yb-nesha-r-ks-projects.vercel.app

### **Backend (Render)**
🔗 https://freelancing-marketplace-icrk.onrender.com

---

## ⭐ **Features**

### 👤 **Authentication & User Roles**
- Secure login & signup using JWT  
- Two roles: **Freelancer** & **Client**  
- Role-based access and dashboards  

---

## 📊 **Freelancer Dashboard**
- View active project & progress  
- Animated **circular progress indicator**  
- Update project status (**In Progress / Completed**)  
- Total projects, completed projects statistics  
- Recently assigned tasks preview  
- Quick actions panel:
  - Browse Jobs  
  - Post a Job  
  - My Profile  
  - Edit Profile  
- Modern dark-themed UI

---

## 💼 **Client Features**
- Post new job listings  
- View proposals submitted by freelancers  
- Approve or reject proposals  
- Auto-create project on approval  

---

## 📝 **Jobs & Proposals**
- Freelancers can browse open jobs  
- Submit proposals with bid & message  
- Prevents duplicate proposals  
- Jobs applied already will not appear again  
- Client can view proposals for each job  

---

## 🧑‍🎨 **User Profile + Edit Profile**
- Update name, bio, skills, portfolio links  
- Upload profile picture (Multer + static hosting)  
- Profile shown in dashboard & job proposals  

---

## 🗂️ **Project Management**
- Auto-generated project when proposal is approved  
- Shows project title, status, progress  
- Progress bar visualization  
- Updates reflected in user statistics  

---

## 🎨 **UI/UX Highlights**
- Fully responsive **dark mode dashboard**  
- Smooth animations  
- Custom cards, grids, activity feed  
- Clean navigation bar  
- Attractive button & icon styling  

---

## 🛠️ **Tech Stack**

### **Frontend**
- React 19  
- React Router v7  
- Bootstrap 5 + Bootstrap Icons  
- Context API Authentication  
- Custom CSS (Dark Dashboard Theme)

### **Backend**
- Node.js + Express.js  
- MongoDB + Mongoose  
- Multer for file uploads  
- JWT Authentication  
- Bcrypt password hashing  
- CORS enabled  

---

## 🌐 **Environment Variables**

### **Frontend (.env)**
REACT_APP_API_URL=https://freelancing-marketplace-icrk.onrender.com


### **Backend (.env)**
MONGO_URI=your_mongo_atlas_url
JWT_SECRET=your_secret_key

---

## 🚀 **Run Locally**

### **Frontend**
cd frontend
npm install
npm start


### **Backend**
cd backend
npm install
node index.js
