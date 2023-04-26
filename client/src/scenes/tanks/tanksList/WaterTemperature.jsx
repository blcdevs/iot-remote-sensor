import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Thermometer from 'react-thermometer-component';

function WaterTemperature() {
const [temperature, setTemperature] = useState(18); // set default temperature to 18

useEffect(() => {
const intervalId = setInterval(() => {
fetchData();
}, 15000);

async function fetchData() {
  try {
    const response = await axios.get(
      'https://api.thingspeak.com/channels/1774321/field/2.json'
    );
    const data = response.data.feeds[0].field2;
    setTemperature(parseFloat(data));
  } catch (error) {
    console.log(error);
  }
}

fetchData();

return () => clearInterval(intervalId);
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
<br/>
<p style={{ textAlign: 'center', fontSize: '32px', marginTop: '10px' }}>
Tank Temperature {temperature}°C
</p>
</div>
);
}

export default WaterTemperature;

