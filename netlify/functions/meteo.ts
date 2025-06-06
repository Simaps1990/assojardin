// netlify/functions/meteo.ts
import fetch from 'node-fetch';

export const handler = async () => {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=45.766&longitude=4.8795&current_weather=true'
    );
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erreur serveur météo', message: error.message }),
    };
  }
};
