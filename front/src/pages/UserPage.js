import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../api/userApi";
import { getCities, deleteCity } from "../api/cityApi"; // Added deleteCity
import CityForm from "../components/Forms/CityForm";
import CitiesList from "../components/CitiesList/CitiesList";

const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCities();
  }, [userId]);

  const handleCityAdded = (newCity) => {
    setCities((prevCities) => [...prevCities, newCity]);
  };

  const handleCityDeleted = async (cityId) => {
    try {
      await deleteCity(cityId); // Call the delete API
      setCities((prevCities) => prevCities.filter((city) => city._id !== cityId));
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  if (loading) return <p>Loading user data...</p>;

  if (!user) return (
    <>
      <p>User not found.</p>
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Back
      </button>
    </>
  );


  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <CityForm userId={userId} onCityAdded={handleCityAdded} />
      <CitiesList cities={cities} onDelete={handleCityDeleted} />
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        Back
      </button>
    </div>
  );
};

export default UserPage;
