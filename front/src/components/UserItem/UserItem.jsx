import { Link } from "react-router-dom";

const UserItem = ({ user }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.city || "No city available"}</p>
      <Link to={`/users/${user._id}`}>View Details</Link>
    </div>
  );
};

export default UserItem;
