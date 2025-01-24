import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../api/userApi";
import { getCities, deleteCity, editCity } from "../api/cityApi"; // Includes deleteCity and editCity functions
import CityForm from "../components/Forms/CityForm";
import CitiesList from "../components/CitiesList/CitiesList";

const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cityToEdit, setCityToEdit] = useState(null); // Track the city being edited

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

  const editCityHandler = async (updatedCity) => {
    const { _id, ...cityData } = updatedCity;

    try {
      const updatedCityData = await editCity(_id, cityData);
      setCities((prevCities) =>
        prevCities.map((city) => (city._id === _id ? updatedCityData : city))
      );
      setCityToEdit(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating city:", error);
    }
  };

  const startEditHandler = (city) => {
    setCityToEdit(city); // Set the city to edit
  };

  const cancelEditHandler = () => {
    setCityToEdit(false); // Exit edit mode without changes
  };

  const handleCityAdded = (newCity) => {
    setCities((prevCities) => [...prevCities, newCity]);
  };

  const handleCityDeleted = async (cityId) => {
    try {
      await deleteCity(cityId);
      setCities((prevCities) => prevCities.filter((city) => city._id !== cityId));
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  if (loading) return <p>Loading user data...</p>;

  if (!user)
    return (
      <>
        <p>User not found.</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
      </>
    );

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <CityForm
        userId={userId}
        onCityAdded={handleCityAdded}
        cityToEdit={cityToEdit} // Pass city to edit if in edit mode
        onCancelEdit={cancelEditHandler} // Handle cancel edit
        onEditCity={editCityHandler} // Handle city updates
      />
      <CitiesList
        cities={cities}
        onDelete={handleCityDeleted} // Handle city deletion
        onEdit={startEditHandler} // Start edit mode for a city
      />
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
    </div>
  );
};

export default UserPage;
