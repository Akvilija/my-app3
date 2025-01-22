import CityItem from "./CityItem";

const CitiesList = ({ cities }) => {
  if (!cities || cities.length === 0) {
    return <p>No associated cities.</p>;
  }

  return (
    <ul>
      {cities.map((city) => (
        <CityItem key={city._id} city={city} /> 
      ))}
    </ul>
  );
};

export default CitiesList;