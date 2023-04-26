import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { color } from "d3-color";
import LiquidFillGauge from "react-liquid-gauge";
import axios from "axios";

function TankVolumeCent({ radius = "200", unit = "%" }) {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/1774321/field/3.json"
        );
        const data = response.data.feeds[0];
        const waterLevelPercentage = parseFloat(data.field3);
        setValue(waterLevelPercentage);
      } catch (error) {
        console.log(error);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={value}
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
          fill: color("#444").toString(),
          fontFamily: "Arial",
        }}
        waveTextStyle={{
          fill: color("#fff").toString(),
          fontFamily: "Arial",
        }}
      />
      <div style={{ textAlign: "center", fontSize: 24, marginTop: 10 }}>
        Water level: {value.toFixed(2)}{unit}
      </div>
    </div>
  );
}

export default TankVolumeCent;
