import UserItem from "../UserItem/UserItem"; 
import "./UsersList.scss"; 

const UserList = ({ data, onDelete }) => {

  if (!data || data.length === 0) {
    return <h2>No users yet</h2>;
  }

  return (
    <>
      <h2>User List:</h2>
      <div className="user-list-container">
        {data.map((user) => (
          <UserItem key={user._id} user={user} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};

export default UserList;