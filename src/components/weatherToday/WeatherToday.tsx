import "./WeatherToday.css";
import WeatherItem from "../WeatherItem/WeatherItem";
import { ApiWeatherResponse } from "../ApiWeather/ApiWeather";
import { roundingNumber } from "../../utils/roundingNumber";
import { format, fromUnixTime, isToday, parseISO } from "date-fns";
import WeatherSpecificationsList from "../weatherSpecificationsList/WeatherSpecificationsList";
import convertMetertoKilometer from "../../utils/convertMetertoKilometer";
import convertSpeedMToKm from "../../utils/convertSpeedMToKm";

type WeatherTodayProps = {
  weatherData: ApiWeatherResponse;
};
const WeatherToday = ({ weatherData }: WeatherTodayProps) => {
  const todayData = weatherData?.list.filter((data) => {
    if (isToday(data?.dt_txt)) {
      return data;
    }
  });
  const fristData = todayData[0];
  return (
    <div className="weatherToday-container">
      <div className="today-date">
        {" "}
        {format(parseISO(fristData?.dt_txt ?? ""), "EEEE")} &#40;{" "}
        {format(parseISO(fristData?.dt_txt ?? ""), "dd.MM.yy")} &#41;{" "}
      </div>
      <div className="temp-section">
        <div className="temp-infor">
          <span className="temp-current">
            {roundingNumber(fristData?.main.temp)}°
          </span>
          <p> Feels like {roundingNumber(fristData?.main.feels_like)}°</p>
          <p>
            {" "}
            <span>{roundingNumber(fristData?.main?.temp_min)}°&darr;</span>{" "}
            <span> {roundingNumber(fristData?.main?.temp_max)}&uarr; </span>
          </p>
        </div>
        <div className="times">
          {todayData.map((child, index) => {
            return (
              <WeatherItem
                key={index}
                header={format(parseISO(child?.dt_txt), "h:mm a")}
                icon={child?.weather[0]?.icon}
                footer={roundingNumber(child?.main?.temp)}
              />
            );
          })}
        </div>
      </div>
      <div className="weatherDetail-container">
        <div className="weather-status">
          <span className="status-header">
            {" "}
            {fristData?.weather[0]?.description}{" "}
          </span>
          <div className="status-icon">
            <img
              className="weather-icon"
              src={`https://openweathermap.org/img/wn/${fristData?.weather[0]?.icon}@4x.png`}
            />
          </div>
        </div>
        <div className="weather-index">
          <WeatherSpecificationsList
            visability={convertMetertoKilometer(fristData?.visibility)}
            humidity={`${fristData?.main.humidity}%`}
            windSpeed={convertSpeedMToKm(fristData?.wind?.speed)}
            airPressure={`${fristData?.main?.pressure}hPa`}
            sunrise={`${format(
              fromUnixTime(weatherData?.city?.sunrise ?? 12),
              "p"
            )}`}
            sunset={`${format(
              fromUnixTime(weatherData?.city?.sunset ?? 12),
              "p"
            )}`}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherToday;
