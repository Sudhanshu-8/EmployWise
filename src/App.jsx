import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Login from "./Login";
import Users from "./Users";
import EditUser from "./EditUser";

const App = () => {
  return (
    <>
      <ToastContainer /> {/* ✅ Global Toast Container */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </>
  );
};

export default App;
