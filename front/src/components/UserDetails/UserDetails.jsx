import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";  // Ensure this function is defined in userApi.js
import { getCities } from "../api/cityApi";    // Ensure this function is defined in cityApi.js

const UserDetails = () => {
  const { userId } = useParams(); // Extract userId from the URL
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details
        const userData = await getUserById(userId);
        setUser(userData);

        // Fetch cities associated with the user
        const allCities = await getCities();  // Fetch all cities
        const userCities = allCities.filter((city) => city.userId === userId); // Filter cities by userId
        setCities(userCities);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.city || "N/A"}</p>

      <h3>Associated Cities</h3>
      {cities.length > 0 ? (
        <ul>
          {cities.map((city) => (
            <li key={city._id}>
              <strong>{city.name}</strong> - {city.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No associated cities.</p>
      )}
    </div>
  );
};

export default UserDetails;
