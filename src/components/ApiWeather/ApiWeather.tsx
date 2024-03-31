import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WeatherToday from "../weatherToday/WeatherToday";
import WeatherDetail from "../weatherDetail/WeatherDetail";
import Navigation from "../navigation/Navigation";
import { useState } from "react";

export type ApiWeatherResponse = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherElement[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type WeatherElement = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};
const ApiWeather = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  const { isPending, error, data } = useQuery<ApiWeatherResponse>({
    queryKey: ["weather"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=hanoi&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&cnt=56&units=metric`
      );
      return data;
    },
  });
  console.log("data", data);
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="app-container">
      <Navigation setSearchValue={setSearchValue} />
      <main className="main-container">
        <WeatherToday weatherData={data} />
        <WeatherDetail />
      </main>
    </div>
  );
};

export default ApiWeather;
