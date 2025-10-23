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
    <section className="bg-neutral-700 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold">Hourly Forecast</p>
        <select value={selectedDay} className="bg-neutral-600 px-4 py-2 rounded-xl cursor-pointer"
        onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          {dailyTimes?.map((timeStamp, index) => {
          const dayName = new Date(timeStamp).toLocaleDateString("en-GB", {
            weekday: "long",
          });
          return (
            <option key={timeStamp} value={index} className="cursor-pointer">  
              {dayName}
            </option>
          );
        })}

        </select>
        
      </div>
      <div className="flex flex-col gap-4 max-h-[calc(8*4rem)] overflow-scroll rounded-xl">
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
            <div
              key={hourTime}
              className="flex justify-between items-center px-4 py-2 bg-neutral-600 rounded-xl"
            >
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
