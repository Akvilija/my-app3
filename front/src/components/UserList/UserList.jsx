import React, { useState, useEffect } from "react";
import axios from "axios";
import UserItem from "./UserItem"; // Import UserItem component

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <UserItem key={user._id} user={user} /> // Render UserItem component for each user
      ))}
    </div>
  );
}

export default UserList;