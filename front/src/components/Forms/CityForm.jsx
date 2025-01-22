import React, { useState } from "react";
import { createCity } from "../../api/cityApi";
import "./Form.scss";

const CityForm = ({ userId, onCityAdded }) => {
  const [newCity, setNewCity] = useState({ name: "", description: "", image: "" }); 

  const handleInputChange = (e) => {
    setNewCity({ ...newCity, [e.target.name]: e.target.value });
  };

  const handleAddCity = async (e) => {
    e.preventDefault();
    try {
      const createdCity = await createCity({ ...newCity, userId }); 
      onCityAdded(createdCity); 
      setNewCity({ name: "", description: "", image: "" }); 
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <form onSubmit={handleAddCity} className="form-container">
      <input
        type="text"
        name="name"
        placeholder="City Name"
        value={newCity.name}
        onChange={handleInputChange}
        className="form-input"
      />
      <input
        type="text"
        name="description"
        placeholder="City Description"
        value={newCity.description}
        onChange={handleInputChange}
        className="form-input"
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newCity.image}
        onChange={handleInputChange}
        className="form-input"
      />
      <button type="submit" className="form-button">
        Add City
      </button>
    </form>
  );
};

export default CityForm;
