import './WeatherToday.css';
import { LuDroplet, LuEye, LuSunrise, LuSunset, LuWind } from 'react-icons/lu';
import { FaCircle } from 'react-icons/fa';
import { ImMeter } from 'react-icons/im';
const mocktime = [
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
  { hours: '9:00 pm', icon: <FaCircle />, temp: '30°' },
];
const WeatherToday = () => {
  return (
    <div className="weatherToday-container">
      <div className="today-date"> Monday &#40; 25.03.2024 &#41; </div>
      <div className="temp-section">
        <div className="temp-infor">
          <span className="temp-current">32°</span>
          <p> Feels like 29°</p>
          <p>
            {' '}
            <span>31°&darr;</span> <span> 31°&uarr; </span>
          </p>
        </div>
        <div className="times">
          {mocktime.map((child) => (
            <div className="hours">
              <p> {child.hours} </p>
              <div className="hours-icon">
                <div className="icon-img">{child.icon}</div>
              </div>
              <p>{child.temp}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="weatherDetail-container">
        <div className="weather-status">
          <span className="status-header"> Scattered Clounds </span>
          <div className="status-icon">
            <img
              className="weather-icon"
              src="https://openweathermap.org/img/wn/02n@4x.png"
            />
          </div>
        </div>
        <div className="weather-index">
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
      </div>
    </div>
  );
};

export default WeatherToday;
