import React, { useState } from "react";
import { createCity } from "../../api/cityApi";

const CityForm = ({ userId, onCityAdded }) => {
  const [newCity, setNewCity] = useState({ name: "", description: "" });

  const handleInputChange = (e) => {
    setNewCity({ ...newCity, [e.target.name]: e.target.value });
  };

  const handleAddCity = async (e) => {
    e.preventDefault();
    try {
      const createdCity = await createCity({ ...newCity, userId }); // Add userId to the city
      onCityAdded(createdCity); // Notify parent about the new city
      setNewCity({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <form onSubmit={handleAddCity}>
      <input
        type="text"
        name="name"
        placeholder="City Name"
        value={newCity.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="City Description"
        value={newCity.description}
        onChange={handleInputChange}
      />
      <button type="submit">Add City</button>
    </form>
  );
};

export default CityForm;
