import React, { useState } from "react";
import { createUser } from "../api/userApi";

const UserForm = ({ onUserAdded }) => {
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const createdUser = await createUser(newUser);
      onUserAdded(createdUser); // Notify parent component about the new user
      setNewUser({ name: "", email: "" }); // Reset form
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleAddUser}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleInputChange}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
