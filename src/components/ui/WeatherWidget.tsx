import React, { useState, useEffect } from 'react';
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  CloudLightning,
  CloudFog,
} from 'lucide-react';

type WeatherWidgetProps = {
  renderTips?: (params: {
    weatherCode: number;
    temperature: number;
    city: string;
    icon: React.ReactNode;
    airQuality: string;
  }) => React.ReactNode;
};

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ renderTips }) => {
  const [weather, setWeather] = useState<{
    location: string;
    temperature: number;
    weatherCode: number;
    airQuality: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getWeatherIcon = (code: number): React.ReactNode => {
    if (code === 0) return <Sun className="text-accent-500" />;
    if ([1, 2, 3].includes(code)) return <Cloud className="text-neutral-400" />;
    if ([45, 48].includes(code)) return <CloudFog className="text-neutral-400" />;
    if ([51, 53, 55, 56, 57, 61, 63, 65].includes(code))
      return <CloudRain className="text-secondary-500" />;
    if ([71, 73, 75].includes(code)) return <CloudSnow className="text-secondary-300" />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className="text-warning-500" />;
    return <Sun className="text-accent-500" />;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const meteoRes = await fetch('/.netlify/functions/meteo');
        const meteoData = await meteoRes.json();

        const airRes = await fetch(`https://api.airvisual.com/v2/nearest_city?key=17c1f31a-4a2e-4104-bf9e-3ad4349c3f39`);
        const airData = await airRes.json();

        const aqi = airData?.data?.current?.pollution?.aqius;
        let airQuality = 'Indisponible';
        if (aqi <= 50) airQuality = 'Bonne';
        else if (aqi <= 100) airQuality = 'Modérée';
        else if (aqi <= 150) airQuality = 'Mauvaise pour les sensibles';
        else if (aqi <= 200) airQuality = 'Mauvaise';
        else if (aqi <= 300) airQuality = 'Très mauvaise';
        else airQuality = 'Dangereuse';

        setWeather({
          location: 'Villeurbanne',
          temperature: Math.round(meteoData.current_weather.temperature),
          weatherCode: meteoData.current_weather.weathercode,
          airQuality: airQuality,
        });

        setError(null);
      } catch (err) {
        console.error('Erreur récupération données météo / qualité air:', err);
        setError('Impossible de charger les données météo');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
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
    <>
      {renderTips &&
        renderTips({
          weatherCode: weather.weatherCode,
          temperature: weather.temperature,
          city: weather.location,
          icon: getWeatherIcon(weather.weatherCode),
          airQuality: weather.airQuality,
        })}
    </>
  );
};

export default WeatherWidget;
