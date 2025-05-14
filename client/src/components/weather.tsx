import React, { useEffect, useState } from "react";
import styles from "./weather.module.css";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface WeatherProps {
  lat?: number;
  lng?: number;
}

const Weather: React.FC<WeatherProps> = ({ lat, lng }) => {
  const [meteo, setMeteo] = useState<WeatherData | null>(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (lat && lng) {
      const fetchMeteo = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric&lang=fr`
          );
          const data = await response.json();
          if (data?.weather && data?.main && data?.name) {
            setMeteo(data);
          }
        } catch (error) {
          console.error("Erreur de récupération des données météo :", error);
        }
      };
      fetchMeteo();
    }
  }, [lat, lng]);

  return (
    <div className={styles.container}>
      {meteo ? (
        <div className={styles.card}>
          <img
            src={`http://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
            alt={meteo.weather[0].description}
          />
          <p>🌡 Température : {meteo.main.temp} °C</p>
          <p>☁️ Conditions : {meteo.weather[0].description}</p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Weather;
