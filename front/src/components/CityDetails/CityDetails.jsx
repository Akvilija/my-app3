import React, { useEffect, useState } from "react";
import { getCities } from "../api/cityApi";

const CityDetails = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div>
      <h2>City Details</h2>
      {cities.length > 0 ? (
        cities.map((city) => (
          <div key={city._id}>
            <h3>{city.name}</h3>
            <p>{city.description}</p>
          </div>
        ))
      ) : (
        <p>No cities found.</p>
      )}
    </div>
  );
};

export default CityDetails;
