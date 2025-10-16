import React from "react";
import useWeatherApi from "../hooks/useWeatherApi";

interface SearchProps {
  city: string;
}
export default function MainTempHero({ city }: SearchProps) {
  const { data } = useWeatherApi(city);
  return (
    <section>
      {data && (
        <>
          <div>
            <p>
              {city},{" "}
              {data?.country}
            </p>
            <p></p>
          </div>
          <div>
            <img src="" alt="" />
            <p></p>
          </div>
        </>
      )}
    </section>
  );
}
