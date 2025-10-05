import { useState, useEffect } from "react";

const useWeatherApi = (query:string) => {

    const [data,setData] = useState<any>(null);
    const [loading,setLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    useEffect(() => {
        // Stops Api firing on page load
        if(!query) return; 
        // ELSE
        const fetchWeather = async () => {
            try{
                setLoading(true)
                setError(null)
                // Try fetch Longitude and Latitude Co-ords
                const geoResonse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`)
                const geoData = await geoResonse.json();
                if(!geoData.results || geoData.results.length === 0){
                    setError("Cant retrieve location co-ordinates")
                    setLoading(false);
                    return
                }

                // Try use geoData co-oridinates to search for weather
                const {longitude, latitude, country} = geoData.results[0]
                const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`)
                const weatherData = await weatherResponse.json();
                setData({weather: weatherData, country})
            }catch{
                setError("Failed to retrieve weather data")
            }finally{
                setLoading(false)
            }
        }
        fetchWeather();
    },[query])
    useEffect(() => {
    console.log(data)
},[data])
    return{data,loading,error}
    
}

export default useWeatherApi