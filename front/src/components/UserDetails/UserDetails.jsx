import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";
import { getCities } from "../../api/cityApi";
import CitiesList from "../../components/CitiesList/CitiesList";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);

        const allCities = await getCities();
        const userCities = allCities.filter((city) => city.userId === userId);
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
      <CitiesList cities={cities} /> {/* Use CitiesList to display cities */}
    </div>
  );
};

export default UserDetails;