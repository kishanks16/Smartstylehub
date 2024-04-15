import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './weather.css'
const WeatherWidget = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true); // State to track day/night

  useEffect(() => {

    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLocation('New Delhi, IN'); // Default to New Delhi
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError(`Error getting geolocation data: ${error.message}`);
          setLocation('New Delhi, IN'); // Default to New Delhi
        }
      );
    };

    fetchLocation();
  }, []);
  // if (latitude !== null && longitude !== null) {

  useEffect(() => {
    const fetchData = async () => {
      if (latitude !== null && longitude !== null) {
        const apiKey = '0b75431e1bb6c7a7c47f74fd2c6a66b8';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    
        try {
          const response = await axios.get(apiUrl);
          console.log(response.data.weather[0].main);
          setWeatherData(response.data);
          setLocation(response.data.name ? `${response.data.name}, ${response.data.sys.country}` : 'New Delhi, IN'); // Set location
        } catch (error) {
          setError('Error fetching weather data');
        }
      }
    };

    fetchData();
  }, [latitude, longitude]);
 console.log(location);
  useEffect(() => {
    // Check if it's day or night based on current time
    const checkDayNight = () => {
      const currentTime = new Date().getHours();
      setIsDay(currentTime > 6 && currentTime < 18); // Assume day from 6 AM to 6 PM
    };

    // Check day/night every minute
    const interval = setInterval(checkDayNight, 60000);

    // Initial check
    checkDayNight();

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (

    
    // <div className={`card ${isDay ? 'day' : 'night'}`}>
      
    //   {/* Render content based on day/night */}
    //   {isDay ? (
    //     <>
    //       <div className="sun"></div>
    //       <div className="cloud"></div>
    //     </>
    //   ) : (
    //     <>
    //       <div className="moon"></div>
    //       <div className="cloud"></div>
    //     </>
    //   )}
    //   <div className="card-header">
    //     <span>{location}</span>
    //     {weatherData && <span>{weatherData.weather[0].description}</span>}
    //   </div>
    //   {weatherData && (
    //     <div className="temp">{Math.round(weatherData.main.temp)}°</div>
    //   )}
    //   <div className="temp-scale">
    <div className="card">
    <div className="container1">
      <div className="cloud front">
        <span className="left-front"></span>
        <span className="right-front"></span>
      </div>
      <span className="sun sunshine"></span>
      <span className="sun"></span>
      <div className="cloud back">
        <span className="left-back"></span>
        <span className="right-back"></span>
      </div>
    </div>

    <div className="card-header">
      <span>{location || 'Chennai'}</span>
      {weatherData && <span>{weatherData.weather[0]?.description || 'Unknown'}</span>}
    </div>

    <span className="temp">{Math.round(weatherData?.main?.temp) || '24'} °</span>

    <div className="temp-scale">
      <span>Celsius</span>
    </div>
  </div>
);
};

export default WeatherWidget;
