import { LuDroplet, LuEye, LuSunrise, LuSunset, LuWind } from "react-icons/lu";
import SingleWeatherSpecifications from "../singleWeatherSpecifications/SingleWeatherSpecifications";
import { ImMeter } from "react-icons/im";

type WeatherSpecificationsListProps = {
  visability: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
};

function WeatherSpecificationsList(props: WeatherSpecificationsListProps) {
  const {
    visability = "25km",
    humidity = "61%",
    windSpeed = "7 km/h",
    airPressure = "1012 hPa",
    sunrise = "6.20",
    sunset = "18:48",
  } = props;
  return (
    <>
      <SingleWeatherSpecifications
        information="Visability"
        indexIcon={<LuEye />}
        value={visability}
      />
      <SingleWeatherSpecifications
        information="Humidity"
        indexIcon={<LuEye />}
        value={humidity}
      />
      <SingleWeatherSpecifications
        information="Wind Speed"
        indexIcon={<LuWind />}
        value={windSpeed}
      />
      <SingleWeatherSpecifications
        information="Air Pressure"
        indexIcon={<ImMeter />}
        value={airPressure}
      />
      <SingleWeatherSpecifications
        information="Sunrise"
        indexIcon={<LuSunrise />}
        value={sunrise}
      />
      <SingleWeatherSpecifications
        information="Sunset"
        indexIcon={<LuSunset />}
        value={sunset}
      />
    </>
  );
}

export default WeatherSpecificationsList;
