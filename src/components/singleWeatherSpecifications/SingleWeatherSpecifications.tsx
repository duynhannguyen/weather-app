import { ReactNode } from "react";
import "../WeatherItem/WeatherItem.css";
type SingleWeatherSpecificationsProps = {
  information: string;
  indexIcon: ReactNode;
  value: string;
};

function SingleWeatherSpecifications({
  information,
  indexIcon,
  value,
}: SingleWeatherSpecificationsProps) {
  return (
    <div className="weather-item-container">
      <p className="weather-item-header">{information}</p>
      <div className="weather-item-icon">
        <div className="icon-img">{indexIcon}</div>
      </div>
      <p className="weather-item-footer">{value}</p>
    </div>
  );
}

export default SingleWeatherSpecifications;
