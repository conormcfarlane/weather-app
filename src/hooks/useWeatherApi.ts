import { useState,useEffect} from "react";

function useWeatherApi(query: string){
    const [data,setData] = useState<any>("")
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null >("");

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true)
            setError(null)

            try{
                // fetch geo lat and longititude
                const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`)
                const geoData = await geoRes.json();
                if(!geoData.results || geoData.results.length === 0){
                    setError("Location not found")
                    setLoading(false);
                    return;
                }

                // 2 get weather using lat and long 
                const {latitude,longitude} = geoData.results[0]
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
                const weatherData = await weatherRes.json();
                setData(weatherData);
            }catch{
                setError("Failed to retireve weather data")
            }finally{
                setLoading(false)
            }
        }
        fetchWeather()
    },[query]);
    return {data,loading,error};
}

export default useWeatherApi;
