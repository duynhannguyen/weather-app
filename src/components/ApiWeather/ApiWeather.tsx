import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WeatherToday from "../weatherToday/WeatherToday";
import WeatherDetail from "../weatherDetail/WeatherDetail";
import Navigation from "../navigation/Navigation";
import { useState } from "react";
import { endOfToday, isAfter } from "date-fns";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../loading/Loading";

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
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

export type WeatherElement = {
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
  const [suggestions, setSuggestions] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const { isPending, error, data } = useQuery<ApiWeatherResponse>({
    queryKey: ["weather"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=ohio&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&cnt=56&units=metric`
      );
      return data;
    },
  });

  const handleOnChange = async (value: string) => {
    setSearchValue(value);
    if (value.length >= 3) {
      try {
        setLoadingState(true);
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&cnt=56&units=metric`
        );
        setSuggestions(response.data.city.name);
        setShowSuggestions(true);
        setApiError("");
      } catch (error) {
        setSuggestions("");
        setShowSuggestions(false);
      } finally {
        setLoadingState(false);
      }
    } else {
      setSuggestions("");
      setShowSuggestions(false);
      setLoadingState(false);
    }
    // }
  };
  console.log("data", data);
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  const threeDayForceCast = data?.list.filter((data) => {
    if (isAfter(data?.dt_txt, endOfToday())) {
      return data;
    }
  });

  const uniqueDates = [
    ...new Set(
      threeDayForceCast.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueDates.map((date) => {
    return threeDayForceCast.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
      return entryDate === date;
    });
  }) as WeatherElement[];
  return (
    <div className="app-container">
      <Navigation
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onHandleChange={(e) => handleOnChange(e.target.value)}
      />
      {loadingState && <Loading />}
      {showSuggestions && suggestions}
      <main className="main-container">
        <WeatherToday weatherData={data} />
        <div className="weather-detail-container">
          <div className="weather-detail-header">
            {" "}
            Forcast &#40; {`${firstDataForEachDate.length} days`} &#41;{" "}
          </div>
          <WeatherDetail
            weatherDataDetail={firstDataForEachDate}
            allWeatherData={data}
          />
        </div>
      </main>
    </div>
  );
};

export default ApiWeather;
