import React, { useState } from "react";
import { createUser } from "../../api/userApi";
import "./Form.scss";

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
    <form onSubmit={handleAddUser}  className="form-container">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={newUser.name}
        onChange={handleInputChange}
        className="form-input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={newUser.email}
        onChange={handleInputChange}
        className="form-input"
      />
      <button type="submit" className="form-button">Add User</button>
    </form>
  );
};

export default UserForm;
