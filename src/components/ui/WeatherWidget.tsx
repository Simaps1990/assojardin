import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, CloudFog } from 'lucide-react';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<{
    location: string;
    temperature: number;
    weatherCode: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 // const latitude = 45.766;
  // const longitude = 4.8795;

  const getWeatherIcon = (code: number) => {
    // Mapping Open-Meteo weather codes to icons
    if (code === 0) return <Sun className="text-accent-500" />;
    if ([1, 2, 3].includes(code)) return <Cloud className="text-neutral-400" />;
    if ([45, 48].includes(code)) return <CloudFog className="text-neutral-400" />;
    if ([51, 53, 55, 56, 57, 61, 63, 65].includes(code)) return <CloudRain className="text-secondary-500" />;
    if ([71, 73, 75].includes(code)) return <CloudSnow className="text-secondary-300" />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className="text-warning-500" />;
    // Default icon
    return <Sun className="text-accent-500" />;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
const url = '/.netlify/functions/meteo';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur API météo: ${response.status}`);
        const data = await response.json();
        if (!data.current_weather) throw new Error("Données météo actuelles manquantes");
        setWeather({
          location: "Villeurbanne, FR",
          temperature: Math.round(data.current_weather.temperature),
          weatherCode: data.current_weather.weathercode,
        });
        setError(null);
      } catch (err) {
        console.error("Erreur récupération météo:", err);
        setError("Impossible de charger la météo");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // refresh 30 min

    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex items-center text-sm text-neutral-500 animate-pulse">
        <Cloud size={16} className="mr-1" />
        <span>Chargement météo...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center text-sm text-error-500">
        <span>{error}</span>
      </div>
    );

  if (!weather) return null;

  return (
    <div className="flex items-center bg-transparent rounded-full px-3 py-1">

      <div className="mr-2">{getWeatherIcon(weather.weatherCode)}</div>
      <div className="text-sm">
        <span className="font-medium">{weather.temperature}°C</span>
        <span className="mx-1 text-neutral-400">|</span>
        <span className="text-primary-300">{weather.location}</span>

      </div>
    </div>
  );
};

export default WeatherWidget;
