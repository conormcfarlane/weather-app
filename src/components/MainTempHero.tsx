import React from "react";
import useWeatherApi from "../hooks/useWeatherApi";
import { getWeatherIcons } from "../utils/getWeatherIcon";
interface SearchProps {
  city: string;
}
export default function MainTempHero({ city }: SearchProps) {
  const { data } = useWeatherApi(city);
  const dateString = data?.current?.time;
  const formattedDate = dateString
    ? new Date(dateString).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  return (
    <section className="px-6 py-10 bg-blue-500 flex flex-col items-center text-center rounded-xl">
      {data && (
        <>
          <div>
            <p className="text-3xl mb-3">
              {city}, {data?.country}
            </p>
            <p className="text-lg">{formattedDate}</p>
          </div>
          <div className="flex justify-between bg-green-500 w-full">
            {data?.current?.weather_code != null ? (
              <img
                src={getWeatherIcons(data?.current?.weather_code)}
                alt=""
                className="w-30"
              />
            ) : null}
            <p className="text-8xl">
              {data?.current?.apparent_temperature != null
                ? Math.round(data.current.apparent_temperature)
                : ""}
            </p>
          </div>
        </>
      )}
    </section>
  );
}
