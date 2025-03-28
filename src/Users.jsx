import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Users.css";
import SearchFilter from "./SearchFilter";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      loadUsers();
    }
  }, [navigate]);

  // ✅ Load users from API or localStorage
  const loadUsers = async () => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers && storedUsers.length > 0) {
      setAllUsers(storedUsers);
      updateUsersForPage(1, storedUsers);
    } else {
      fetchAllUsers();
    }
  };

  // ✅ Fetch users from API if not in localStorage
  const fetchAllUsers = async () => {
    try {
      let allUsersData = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= totalPages) {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        allUsersData = [...allUsersData, ...response.data.data];
        totalPages = response.data.total_pages;
        currentPage++;
      }

      setAllUsers(allUsersData);
      updateUsersForPage(1, allUsersData);
      localStorage.setItem("users", JSON.stringify(allUsersData)); // ✅ Save to localStorage
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ Updates user list in localStorage
  const updateEditedUser = (updatedUser) => {
    const updatedUsers = allUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user));

    setAllUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setUsers(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers)); // ✅ Save changes
  };

  // ✅ Handle deletion and update localStorage
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      const updatedUsers = allUsers.filter((user) => user.id !== id);
      
      setAllUsers(updatedUsers);
      updateUsersForPage(page, updatedUsers);

      localStorage.setItem("users", JSON.stringify(updatedUsers)); // ✅ Save updated list

      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const updateUsersForPage = (pageNum, userList) => {
    const perPage = 6;
    const start = (pageNum - 1) * perPage;
    const paginatedUsers = userList.slice(start, start + perPage);

    setUsers(paginatedUsers);
    setFilteredUsers(paginatedUsers);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.info("Logged out successfully!");
  };

  return (
    <div className="users-container">
      <h2>User List</h2>
      <SearchFilter users={allUsers} setFilteredUsers={setFilteredUsers} />

      <table className="users-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar} alt={user.first_name} width="50" />
                </td>
                <td>{user.first_name} {user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/edit/${user.id}`, { state: user })}>
                    Edit
                  </button>
                  &nbsp;
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found!</td>
            </tr>
          )}
        </tbody>
      </table>

      <br />
      <div className="pagination">
        <button disabled={page === 1} onClick={() => { setPage(page - 1); updateUsersForPage(page - 1, allUsers); }}>Previous</button>
        <span> Page {page} </span>
        <button disabled={(page * 6) >= allUsers.length} onClick={() => { setPage(page + 1); updateUsersForPage(page + 1, allUsers); }}>Next</button>
      </div>
      <br />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Users;
