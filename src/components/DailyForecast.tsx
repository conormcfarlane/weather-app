import React from "react";
import useWeatherApi from "../hooks/useWeatherApi";
import { getWeatherIcons } from "../utils/getWeatherIcon";

interface SearchProps {
  city: string;
}

export default function DailyForecast({ city }: SearchProps) {
  const { data } = useWeatherApi(city);
  const dailyWeather = data?.daily;

  return (
    <section className="bg-red-500">
      <p className="font-bold mb-5">Daily Forecast</p>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-7">
        {dailyWeather?.time.map((dateStamp, index) => {
            const shortDay = new Date(dateStamp).toLocaleDateString("en-GB",{weekday:"short"})
          return (
            <div key={dateStamp} className="bg-neutral-700 rounded-xl flex flex-col items-center px-2.5 py-4">
              <p>{shortDay}</p>
              <img src={getWeatherIcons(dailyWeather?.weather_code[index])} alt="" />
              <div className="flex justify-between w-full ">
                <p>{dailyWeather?.temperature_2m_max[index]}</p>
                <p>{dailyWeather?.temperature_2m_min[index]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
