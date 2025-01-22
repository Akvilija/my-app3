import { useState, useEffect } from "react";
import UserForm from "../components/Forms/UserForm";
import UsersList from "../components/UsersList/UsersList";
import { getUsers } from "../api/userApi";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const newUserHandler = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const deleteUserHandler = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <div>
      <UserForm onUserAdded={newUserHandler} />
      <UsersList data={users} onDelete={deleteUserHandler} />
    </div>
  );
};

export default UsersPage;
