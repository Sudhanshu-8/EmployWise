import React, { useState } from "react";
import "./css/SearchFilter.css"; // Separate CSS for styling

const SearchFilter = ({ users, setFilteredUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter users based on search term (by name or email)
    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(value) ||
        user.last_name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
