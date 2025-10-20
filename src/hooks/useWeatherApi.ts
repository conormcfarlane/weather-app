import { useState,useEffect } from "react";

// Geo Data Types
interface GeoResult {
    latitude:number;
    longitude: number;
    country: string;
    timezone: string;
}
// Weather Data Types
interface WeatherResult{
    current?:{
        time:string;
        weather_code:number;
        apparent_temperature:number;
        relative_humidity_2m:number;
        wind_speed_10m:number;
        precipitation:number;
    },
    hourly?:{
        time:string[];
        temperature_2m:number[];
    };
    country?: string;
}

function useWeatherApi(query:string){
    const [data,setData] = useState<WeatherResult | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null>(null)

    useEffect(() => {
        // return if not query
        if(!query) return;

      const fetchWeatherData = async () => {      
        try{
            setError(null);
            setLoading(true)
            //1st get latitude and longitiude
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`)
            // Safely encodes special characters for use in URL.. ie , if there was a space, URL still works !! ALWAYS USE when inserting user input
            if(!geoResponse.ok){
                setError("Couldn't retrieve geo location")
                setLoading(false)
                return

            }

            // When using type, results was not needed but is good practise as adds more type security
            const geoData : {results: GeoResult[]} = await geoResponse.json();
            if(!geoData.results || geoData.results.length === 0){
                setError("No location found")
                setLoading(false)
                return
            }
            // 2nd use long and lat to retrieve data
            const {longitude,latitude, country} = geoData.results[0]
            const timezone = encodeURIComponent(geoData.results[0].timezone)
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation&timezone=${timezone}`)
            if(!weatherResponse.ok){
                setError("Couldnt retrieve weather data")
                setLoading(false)
                return
            }
            const weatherData : WeatherResult = await weatherResponse.json()
            setData({...weatherData, country})
        }catch(err){
            setError("Failed to fetch any data")
        }finally{
            setLoading(false)
        } 
    
    }
        fetchWeatherData();
    },[query]);
    useEffect(()=>{
        console.log(data)
    },[data])
    return {data,loading,error};
}
export default useWeatherApi;