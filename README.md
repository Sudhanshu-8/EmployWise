---

# **User Management App (React + Vite)**  

This project is a **User Management System** built using **React + Vite**. It allows users to **view, edit, delete, and update user details**, with data fetched from a mock API ([ReqRes API](https://reqres.in/)).  

## **📌 Features**  
✅ Fetches user list from API  
✅ Search and filter users  
✅ Edit user details (First Name, Last Name, Email)  
✅ Delete users  
✅ Local storage integration  
✅ Pagination support  
✅ Toast notifications for success/error messages  

---

## **🚀 Getting Started**  

### **🔹 Prerequisites**  
Ensure you have the following installed on your system:  
- **Node.js** (v16+ recommended) → [Download Node.js](https://nodejs.org/)  
- **Git** (for version control) → [Download Git](https://git-scm.com/)  

---

### **🔹 Installation**  

1️⃣ **Clone the repository**  
```sh
git clone https://github.com/Sudhanshu-8/EmployWise.git
cd your-repository
```

2️⃣ **Install dependencies**  
```sh
npm install
```

3️⃣ **Run the development server**  
```sh
npm run dev
```
This will start the app, and you can access it at **`http://localhost:5173/`**.

---

## **🔹 API Endpoints Used**
This project uses **ReqRes API** to simulate user management.

| Action  | Method | Endpoint |
|---------|--------|----------------|
| Get Users | `GET` | `https://reqres.in/api/users?page=1` |
| Update User | `PUT` | `https://reqres.in/api/users/{id}` |
| Delete User | `DELETE` | `https://reqres.in/api/users/{id}` |

---

## **🔹 Project Structure**  
```
📂 your-project
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Users.jsx
 ┃ ┃ ┣ 📜 EditUser.jsx
 ┃ ┣ 📂 css
 ┃ ┃ ┣ 📜 Users.css
 ┃ ┃ ┣ 📜 EditUser.css
 ┃ ┣ 📜 App.jsx
 ┃ ┣ 📜 main.jsx
 ┣ 📜 package.json
 ┣ 📜 vite.config.js
 ┣ 📜 README.md
```

---

## **🔹 Deployment**
To build the project for production:  
```sh
npm run build
```
The output files will be in the `dist/` folder, ready for deployment.

---

## **🔹 GitHub Contribution Guide**  
1. **Fork** the repository  
2. **Clone** your fork  
3. Create a new branch: `git checkout -b feature-branch`  
4. Make your changes & commit: `git commit -m "Your message"`  
5. Push to GitHub: `git push origin feature-branch`  
6. Open a **Pull Request** 🚀  

---

Now, replace `Sudhanshu-8/EmployWise` with your actual GitHub details and update as needed. Let me know if you need any modifications! 🚀🔥
