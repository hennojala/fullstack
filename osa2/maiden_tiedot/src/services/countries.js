import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'


// muuttujassa api_key on käynnistyksessä annettu API-avaimen arvo
const api_key = import.meta.env.VITE_SOME_KEY
const openWeather = 'https://api.openweathermap.org/data/2.5/weather?'

const getWeatherData = (country) => {
    const request = axios.get(openWeather, {
      params: {
        lat: country.capitalInfo.latlng[0],
        lon: country.capitalInfo.latlng[1],
        units: 'metric',
        appid: api_key
      },
    });
    return request.then(response => {
        return response.data
    });
};

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

export default {
    getAll,
    getWeatherData
}