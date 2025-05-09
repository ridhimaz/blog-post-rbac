## Blog Platform with Role-Based Access Control (RBAC)

A full-stack blog platform built using the **MERN** stack (MongoDB, Express.js, React.js, Node.js) that implements **Role-Based Access Control (RBAC)** using bitwise operation.

## 🔐 Role-Based Access

Users are assigned one of three roles that determine their access levels:

| Role       | Permissions                |
|------------|----------------------------|
| **Admin**      | Create, Read, Delete Blogs |
| **Moderator**  | Read, Delete Blogs          |
| **User**       | Read Blogs Only             |

- New users who register are **automatically assigned the 'User' role**.
- Roles and permissions are managed via **bitwise flags** for performance and scalability.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Authorization:** Custom middleware using bitwise permission logic

---

## 🚀 Features

- ✅ User Signup & Login
- ✅ JWT-based authentication
- ✅ Role-based access using bitwise operations
- ✅ Admin can create, read, and delete blogs
- ✅ Moderator can read and delete blogs
- ✅ User can only read blogs
- ✅ Secure API endpoints

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/ridhimaz/blog-post-rbac.git
cd your-repo-name
```
### 2. Setup the Backend

```bash
cd Backend
npm install
```
Create a .env file inside the backend/ directory:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
```
Start the backend server:
```bash
node Server.js
```
### 3. Setup the Frontend
```bash
cd ../Frontend
npm install
```
Start the frontend:
```bash
npm start
```


