import { useState } from "react";
import iconSearch from "/images/icon-search.svg";
import useWeatherApi from "../hooks/useWeatherApi";


interface SearchProps {
  city : string;
  setCity: (city: string) => void;
}

export default function Search({city, setCity} : SearchProps) {
  const [input, setInput] = useState<string>("");

  const { data } = useWeatherApi(city);

  const handleSubmit = () => {
    setCity(input);
  };
  return (
    <section className="flex flex-col gap-3 md:flex-row lg:max-w-5/10 lg:mx-auto">
      <div className="flex gap-4 bg-neutral-700 px-6 py-4 rounded-xl md:flex-1">
        <img src={iconSearch} alt="search icon" className="w-4 items-center" />
        <input
          type="text"
          placeholder="Search for a place...."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 px-6 py-3 rounded-xl"
      >
        Search
      </button>
    </section>
  );
}
