import React from "react";
import useWeatherApi from "../hooks/useWeatherApi";
import { getWeatherIcons } from "../utils/getWeatherIcon";

// type to deconstruct prop
type SearchProps = {
  city: string;
};
export default function DailyForecast({ city }: SearchProps) {
  const { data } = useWeatherApi(city);

  return (
    <div>
      <p className="text-xl">Daily Forecast</p>
      <div className="grid grid-cols-3 gap-4">
        {data?.weather?.daily?.time.map((stringDate: number, index: number) => {
          const dateNames = new Date(stringDate).toLocaleDateString("en-GB", {
            weekday: "short",
          });
          return (
            <div key={stringDate} className="bg-red-500 w-full flex flex-col">
              <div className="m-auto">
                <p className="text-lg text-center">{dateNames}</p>
                <img
                  src={getWeatherIcons(
                    data?.weather?.daily?.weather_code[index]
                  )}
                  alt=""
                  className="w-15"
                />
              </div>

              <div className="flex justify-between">
                <p>{data?.weather?.daily?.temperature_2m_max[index]}</p>
                <p>{data?.weather?.daily?.temperature_2m_min[index]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
