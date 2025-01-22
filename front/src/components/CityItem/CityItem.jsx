const CityItem = ({ city }) => {
  return (
    <li>
      <strong>{city.name}</strong> - {city.description || "No description available"}
    </li>
  );
};

export default CityItem;
