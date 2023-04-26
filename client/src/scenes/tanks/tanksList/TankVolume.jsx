import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { color } from "d3-color";
import axios from "axios";
import LiquidFillGauge from "react-liquid-gauge";

function TankVolume({ radius = 200, unit = "lit" }) {
    const theme = useTheme();
    const [waterLevel, setWaterLevel] = useState(0);
  
    useEffect(() => {
      const fetchWaterLevel = async () => {
        try {
          const response = await axios.get(
            "https://api.thingspeak.com/channels/1774321/field/1.json"
          );
          const latestFeed = response.data.feeds[0];
          const waterLevelInCm = parseFloat(latestFeed.field1);
          // Assuming a cylindrical tank with a radius of 50 cm, calculate the water level in litres
          const waterLevelInLitres = (Math.PI * Math.pow(50, 2) * waterLevelInCm) / 1000;
          setWaterLevel(waterLevelInLitres);
        } catch (error) {
          console.error("Error fetching water level", error);
        }
      };
  
      // Fetch water level on component mount
      fetchWaterLevel();
  
      // Update water level every 15 seconds
      const interval = setInterval(() => {
        fetchWaterLevel();
      }, 15000);
  
      // Clear the interval on component unmount
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <LiquidFillGauge
          style={{ margin: "0 auto" }}
          width={radius * 2}
          height={radius * 2}
          value={waterLevel}
          percent={unit}
          textSize={1}
          textOffsetX={10}
          textOffsetY={30}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          outerRadius={0.94}
          circleStyle={{
            fill: "rgb(24, 144, 255)",
          }}
          waveStyle={{
            fill: "rgb(24, 144, 255)",
          }}
          textStyle={{
            fill: color("#fff").toString(),
            fontFamily: theme.typography.fontFamily,
          }}
          waveTextStyle={{
            fill: color("#fff").toString(),
            fontFamily: theme.typography.fontFamily,
          }}
        />
        <div style={{ textAlign: "center", marginTop: "10px", fontSize: "24px", color: "#fff" }}>
          Water level: {waterLevel.toFixed(2)} liters
        </div>
      </div>
    );
  }
  
export default TankVolume;
