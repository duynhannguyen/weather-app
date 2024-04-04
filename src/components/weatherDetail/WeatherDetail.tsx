import "./WeatherDetail.css";
import { LuDroplet, LuEye, LuSunrise, LuSunset, LuWind } from "react-icons/lu";
import { ImMeter } from "react-icons/im";
import { ApiWeatherResponse, WeatherElement } from "../ApiWeather/ApiWeather";
import WeatherSpecificationsList from "../weatherSpecificationsList/WeatherSpecificationsList";
import { format, fromUnixTime, parse } from "date-fns";
import { roundingNumber } from "../../utils/roundingNumber";
import convertMetertoKilometer from "../../utils/convertMetertoKilometer";
import convertSpeedMToKm from "../../utils/convertSpeedMToKm";

type WeatherDetailProps = {
  weatherDataDetail: WeatherElement[];
  allWeatherData: ApiWeatherResponse;
};

const WeatherDetail = ({
  weatherDataDetail,
  allWeatherData,
}: WeatherDetailProps) => {
  console.log("weatherDataDetail", weatherDataDetail);
  return (
    <>
      {weatherDataDetail.map((data, i) => {
        const date = parse(data.dt_txt, "yyyy-MM-dd HH:mm:ss", new Date());
        const formattedDate = format(date, "dd.MM");

        return (
          <div key={i} className="weather-detail-wrap">
            <div className="date-detail">
              <img
                className="icon-detail"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              />
              <span className="date"> {formattedDate}</span>
            </div>
            <div className="temp-detail">
              <span className="temp-header">
                {" "}
                {roundingNumber(data.main.temp)}°{" "}
              </span>
              <span className="temp-desc">
                Feels like {roundingNumber(data.main.feels_like)}°{" "}
              </span>
              <p className="temp-status"> {data.weather[0].description} </p>
            </div>
            <WeatherSpecificationsList
              visability={convertMetertoKilometer(data.visibility)}
              humidity={`${data.main.humidity}%`}
              windSpeed={convertSpeedMToKm(data.wind.speed)}
              airPressure={`${data.main.pressure}hPa`}
              sunrise={`${format(
                fromUnixTime(allWeatherData?.city?.sunrise ?? 12),
                "p"
              )}`}
              sunset={`${format(
                fromUnixTime(allWeatherData?.city?.sunset ?? 12),
                "p"
              )}`}
            />
          </div>
        );
      })}
    </>
  );
};

export default WeatherDetail;
