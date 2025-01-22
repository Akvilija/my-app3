import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userApi";
import { getCities } from "../api/cityApi";
import CityForm from "../components/Forms/CityForm";

const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchUserAndCities = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);

        const allCities = await getCities();
        const userCities = allCities.filter((city) => city.userId === userId);
        setCities(userCities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserAndCities();
  }, [userId]);

  const handleCityAdded = (newCity) => {
    setCities((prevCities) => [...prevCities, newCity]);
  };

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <h1>{user.name}'s Details</h1>
      <p>Email: {user.email}</p>
      <h2>Cities</h2>
      <CityForm userId={userId} onCityAdded={handleCityAdded} />
      <ul>
        {cities.map((city) => (
          <li key={city._id}>
            {city.name} - {city.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
