import React from "react";
import { useState,useEffect } from "react";

function useWeatherApi(query: string){
    const [data,setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error,setError] = useState<string | null >(null);


    useEffect(() => {
        if(!query) return;
        const fetchWeather = async () => {
            
        }
    })


}