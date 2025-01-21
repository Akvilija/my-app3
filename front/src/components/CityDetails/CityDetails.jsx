import React from 'react';

const CityDetails = ({ city }) => {
    if (!city) {
        return <div>No city selected</div>;
    }

    return (
        <div>
            <h2>{city.name}</h2>
            <p>Population: {city.population}</p>
            <p>Country: {city.country}</p>
            <p>Description: {city.description}</p>
        </div>
    );
};

export default CityDetails;