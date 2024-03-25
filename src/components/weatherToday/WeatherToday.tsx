import './WeatherToday.css';
import { FaCircle } from 'react-icons/fa';
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
    <div>
      <div className="today-date"> Monday &#40; 25.03.2024 &#41; </div>
      <div className="temp-section">
        <div className="temp-infor">
          <span className="temp-current">32°</span>
          <p> Feels like 29° </p>
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
    </div>
  );
};

export default WeatherToday;
