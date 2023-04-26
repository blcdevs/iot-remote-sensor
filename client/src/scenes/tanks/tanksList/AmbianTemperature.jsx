import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Thermometer from 'react-thermometer-component';

function AmbientTemperature() {
  const [temperature, setTemperature] = useState(18); // set default temperature to 18

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.thingspeak.com/channels/1774321/field/4.json'
      );
      const data = response.data.feeds[0].field4;
      setTemperature(parseFloat(data));
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 15000); // fetch data every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ alignContent: 'center' }}>
      <Thermometer
        theme="dark"
        value={temperature}
        max="100"
        steps="3"
        format="°C"
        size="large"
        height="300"
        color="white"
      />
      <br />
      <p style={{ textAlign: 'center', fontSize: '32px', marginTop: '10px' }}>
        Ambient Temperature {temperature}°C
      </p>
    </div>
  );
}

export default AmbientTemperature;
