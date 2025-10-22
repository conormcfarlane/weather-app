import React, { useState } from "react";
import useWeatherApi from "../hooks/useWeatherApi";
import { getWeatherIcons } from "../utils/getWeatherIcon";

interface SearchProps {
  city: string;
}
export default function HourlyForecast({ city }: SearchProps) {
  const { data } = useWeatherApi(city);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const dailyTimes = data?.daily?.time;
  const hourlyTimes = data?.hourly?.time;
  const startIndex = selectedDay * 24;
  const endIndex = startIndex + 24;
  return (
    <section className="p-4">
      <div>
        <p>Hourly Forecast</p>
        {dailyTimes?.map((timeStamp, index) => {
          const dayName = new Date(timeStamp).toLocaleDateString("en-GB", {
            weekday: "long",
          });
          return (
            <p key={timeStamp} onClick={() => setSelectedDay(index)}>
              {dayName}
            </p>
          );
        })}
      </div>
      <div>
        {hourlyTimes?.slice(startIndex, endIndex).map((hourTime, index) => {
          const actualIndex = startIndex + index;
          const code = data?.hourly?.weather_code[actualIndex];
          const formattedHour = hourTime
            ? new Date(hourTime).toLocaleTimeString("en-GB", {
                hour: "numeric",
                hour12: true,
              })
            : "";
          return (
            <div key={hourTime} className="flex justify-between items-center p-4">
              <div className="flex gap-3 items-center">
                {code != null ? (
                  <img src={getWeatherIcons(code)} alt="" className="h-10" />
                ) : null}
                <p>{formattedHour}</p>
              </div>
              <p>{data?.hourly?.temperature_2m[actualIndex]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
