import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { SuggestionElement } from '../ApiWeather/ApiWeather';
import './CityDetails.css';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useEffect } from 'react';
import { FaPeopleGroup } from 'react-icons/fa6';
import AirPollution from '../airPollution/AirPollution';
import UvIndex from '../uvIndex/UvIndex';
type CityDetailsProps = {
  cityInfor: SuggestionElement;
  populations: number;
  airQuality: number;
  uvIndex: number;
};
type CityCoords = {
  lat: number;
  lon: number;
};
const CityDetails = ({
  cityInfor,
  populations,
  airQuality,
  uvIndex,
}: CityDetailsProps) => {
  const { lat, lon, name } = cityInfor;
  const FlyToCurrentCity = ({ lat, lon }: CityCoords) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lon) {
        const zoomLev = 12;
        const flyToOptions = {
          duration: 1.5,
        };

        map.flyTo([+lat, +lon], zoomLev, flyToOptions);
      }
    }, [map, lat, lon]);
    return null;
  };

  return (
    <div className="cityDetails-wrap">
      <div className="city-section">
        <div className="city-infor">
          <FaMapMarkedAlt />
          {name}
          <span>
            {lat} : {lon}
          </span>
          <span className="population-section">
            <FaPeopleGroup />: {populations}
          </span>
        </div>
        <div className="city-map">
          <MapContainer
            center={[+lat, +lon]}
            zoom={13}
            scrollWheelZoom={true}
            className="mapbox"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyToCurrentCity lat={+lat} lon={+lon} />
          </MapContainer>
        </div>
      </div>
      <div className="city-index-section">
        <div className="air-section">
          <AirPollution score={airQuality} />
        </div>
        <div>
          <UvIndex score={uvIndex} />
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
