import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/EditUser.css";

const EditUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state || {};

  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [email, setEmail] = useState(user.email || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      console.log("Updated User Response:", response.data);
      toast.success("User updated successfully!");

      // ✅ Create updated user object
      const updatedUser = { ...user, first_name: firstName, last_name: lastName, email };

      // ✅ Retrieve existing users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      // ✅ Update user in localStorage
      const updatedUsers = storedUsers.map((u) => (u.id === user.id ? updatedUser : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // ✅ Navigate without refresh
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  return (
    <div className="edit-user-container">
      <div className="edit-user-box">
        <h2>Edit User</h2>
        <form onSubmit={handleUpdate}>
          {/* ✅ First Name */}
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* ✅ Last Name */}
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* ✅ Email */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="update-btn">Update</button>
        </form>
        <button onClick={() => navigate("/users")} className="back-btn">Back to Users</button>
      </div>
    </div>
  );
};

export default EditUser;
