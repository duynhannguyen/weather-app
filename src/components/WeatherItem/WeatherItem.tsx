import './WeatherItem.css';
type WeatherItemProps = {
  header: string;
  icon: string;
  footer: string;
};
const WeatherItem = ({ header, icon, footer }: WeatherItemProps) => {
  return (
    <div className="weather-item-container">
      <p>{header}</p>
      <div className="weather-item-icon">
        <img className="icon-img" src={icon} alt="weather-icon" />
      </div>
      <p>{footer}</p>
    </div>
  );
};

export default WeatherItem;
