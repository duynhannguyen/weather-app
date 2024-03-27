import './WeatherDetail.css';
import { LuDroplet, LuEye, LuSunrise, LuSunset, LuWind } from 'react-icons/lu';
import { ImMeter } from 'react-icons/im';
const WeatherDetail = () => {
  return (
    <div className="weather-detail-wrap">
      <div className="date-detail">
        <img
          className="icon-detail"
          src="https://openweathermap.org/img/wn/02n@4x.png"
        />
        <span className="date"> 28.03</span>
      </div>
      <div className="temp-detail">
        <span className="temp-header"> 27° </span>
        <span className="temp-desc">Feels like 31° </span>
        <p className="temp-status"> Overcast Clounds </p>
      </div>
      <div className="hours">
        <p> Visability </p>
        <div className="hours-icon">
          <div className="icon-img">
            <LuEye />
          </div>
        </div>
        <p>10km</p>
      </div>
      <div className="hours">
        <p> Humidity </p>
        <div className="hours-icon">
          <div className="icon-img">
            <LuDroplet />
          </div>
        </div>
        <p>18%</p>
      </div>
      <div className="hours">
        <p> Wind speed </p>
        <div className="hours-icon">
          <div className="icon-img">
            <LuWind />
          </div>
        </div>
        <p>14 km/h</p>
      </div>
      <div className="hours">
        <p> Air Pressure </p>
        <div className="hours-icon">
          <div className="icon-img">
            <ImMeter />
          </div>
        </div>
        <p>1011 hPa</p>
      </div>
      <div className="hours">
        <p> Sunrise </p>
        <div className="hours-icon">
          <div className="icon-img">
            <LuSunrise />
          </div>
        </div>
        <p>2:25</p>
      </div>
      <div className="hours">
        <p> Sunset </p>
        <div className="hours-icon">
          <div className="icon-img">
            <LuSunset />
          </div>
        </div>
        <p>2:25</p>
      </div>
    </div>
  );
};

export default WeatherDetail;
