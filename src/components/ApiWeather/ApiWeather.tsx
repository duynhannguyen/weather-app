import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WeatherToday from "../weatherToday/WeatherToday";
import WeatherDetail from "../weatherDetail/WeatherDetail";
import Navigation from "../navigation/Navigation";
import { useEffect, useState } from "react";
import { endOfToday, isAfter, set } from "date-fns";
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
  const [suggestions, setSuggestions] = useState<
    { lat: number; lon: number; name: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  console.log("suggestions", suggestions);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const debounceFetch = (value: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetchByCity(value);
      }, 1000);
    };

    if (searchValue) {
      debounceFetch(searchValue);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);
  const { isPending, error, data } = useQuery<ApiWeatherResponse>({
    queryKey: ["weather"],
    queryFn: async () => {
      const { data } = await axios.get(
        // `http://api.openweathermap.org/data/2.5/forecast?q=Ho Chi Minh City&appid=${
        //   import.meta.env.VITE_WEATHER_API_KEY
        // }&cnt=56&units=metric`
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          import.meta.env.VITE_DEFAULT_LAT
        }&lon=${import.meta.env.VITE_DEFAULT_LON}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&cnt=56&units=metric`
      );
      return data;
    },
  });
  console.log(data);
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  const threeDayForceCast = data?.list.filter((data) => {
    if (isAfter(data?.dt_txt, endOfToday())) {
      return data;
    }
  });

  const fetchByCity = async (city: string) => {
    try {
      setLoadingState(true);
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&cnt=56&units=metric`
      );
      setSuggestions(
        response?.data.map((city: any) => ({
          lat: city.lat,
          lon: city.lon,
          name: city.name,
        }))
      );

      setShowSuggestions(true);
      setApiError("");
    } catch (error) {
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoadingState(false);
    }
  };

  const handleOnChange = async (value: string) => {
    setSearchValue(value);
  };

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
      {showSuggestions && suggestions.map((data) => <p> {data.name} </p>)}
      {suggestions.length === 0 && showSuggestions && <p> No suggestions </p>}
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
