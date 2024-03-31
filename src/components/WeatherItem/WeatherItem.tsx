import "./WeatherItem.css";
type WeatherItemProps = {
  header: string;
  icon: string;
  footer: number;
};
const WeatherItem = ({ header, icon, footer }: WeatherItemProps) => {
  return (
    <div className="weather-item-container">
      <p className="weather-item-header">{header}</p>
      <div className="weather-item-icon">
        <img
          className="icon-img"
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather-icon"
        />
      </div>
      <p className="weather-item-footer">{footer}°</p>
    </div>
  );
};

export default WeatherItem;
