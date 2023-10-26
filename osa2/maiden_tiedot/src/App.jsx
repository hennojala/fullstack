import React, { useState, useEffect } from 'react';
import countriesService from './services/countries';

// Kaikkien maiden listaus
const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Yhden maan näyttöä varten
  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };
 
  // Jos valittu näytettävääksi painikkeesta yksi maa, näytetään se.
  if (selectedCountry) {
    return <CountryDetails country={selectedCountry} />;
  }

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountryDetails(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

// Yhden maan näkymä
const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

   // Hae sää
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await countriesService.getWeatherData(country);
        setWeatherData(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching weather data: ', error);
      }
    };

    fetchData(); // Kutsutaan fetchData-funktiota useEffectin sisällä
  }, [country]); // Suoritetaan useEffect aina, kun country muuttuu

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}/>
      {weatherData && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature: {weatherData.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
          <p>wind {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

// Suodatus haku
const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  // Haetaan kaikki maat
  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  // Suodatetaan tulokset
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // Määritellään muuttujat tulosten näyttämisen hallitsemiseksi
  const shouldShowDetails = filteredCountries.length === 1;
  const selectedCountry = shouldShowDetails ? filteredCountries[0] : null;

  return (
    <div>
      <Filter value={search} onChange={(event) => setSearch(event.target.value)} />
    
      {shouldShowDetails ?(
      <CountryDetails country={selectedCountry} />)

      : search.length > 0 && filteredCountries.length > 10 ?
      (<p>Too many matches, please specify your search.</p>)

      : ( search.length > 0 &&
      <Countries countries={filteredCountries}/>)}
    </div>
  );
};

export default App;
