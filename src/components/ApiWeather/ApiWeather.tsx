import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import WeatherToday from "../weatherToday/WeatherToday";
import WeatherDetail from "../weatherDetail/WeatherDetail";
import Navigation from "../navigation/Navigation";
import { useEffect, useState } from "react";
import { endOfToday, isAfter } from "date-fns";
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

export type SuggestionElement = {
  name: string;
  lat: string;
  lon: string;
};

const ApiWeather = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionElement[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetchResult, setFetchResult] = useState<SuggestionElement>({
    lat: import.meta.env.VITE_DEFAULT_LAT,
    lon: import.meta.env.VITE_DEFAULT_LON,
    name: "",
  });
  const [apiError, setApiError] = useState("");
  console.log("apiError", apiError);
  const [loadingState, setLoadingState] = useState(false);
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
  const { isPending, error, data, refetch } = useQuery<ApiWeatherResponse>({
    queryKey: ["weather"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          fetchResult.lat
        }&lon=${fetchResult.lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&cnt=56&units=metric`
      );
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [refetch, fetchResult]);
  console.log(data);
  if (isPending)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {" "}
        <Loading />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  const threeDayForceCast = data?.list.filter((data) => {
    if (isAfter(data?.dt_txt, endOfToday())) {
      return data;
    }
  });

  const fetchByCity = async (city: string) => {
    try {
      setLoadingState(true);
      setShowSuggestions(true);
      setSuggestions([]);
      setApiError("");
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
    } catch (error) {
      setSuggestions([]);
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
        setIsLoading={setLoadingState}
        currentCity={data?.city.name}
        searchValue={searchValue}
        setShowSuggestions={setShowSuggestions}
        setSearchValue={setSearchValue}
        onHandleChange={(e) => handleOnChange(e.target.value)}
        suggestionList={suggestions}
        showSuggestion={showSuggestions}
        isLoading={loadingState}
        setFetchResult={setFetchResult}
        setApiError={setApiError}
        apiError={apiError}
      />
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
