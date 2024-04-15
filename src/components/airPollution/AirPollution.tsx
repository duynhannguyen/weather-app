import { FaThermometerEmpty } from 'react-icons/fa';
import { airQualityIndex } from '../../constants/constants';
import './AirPollution.css';
type AirPollutionProps = {
  score: number;
};

const AirPollution = ({ score }: AirPollutionProps) => {
  const scoreInPerCent = score * 20;

  if (scoreInPerCent > 100) {
    return 'Value must be in 1 to 5';
  }
  const airDescription = airQualityIndex.find((airInfor) => {
    return airInfor.rating === scoreInPerCent;
  });
  return (
    <div
      style={
        airDescription
          ? { background: `${airDescription.background}` }
          : { background: 'rgba(58, 110, 180, 1)' }
      }
      className="air_pollution-section"
    >
      <FaThermometerEmpty /> Air Pollution
      <div className="air-meter">
        <div
          style={
            scoreInPerCent === 100
              ? { marginLeft: `calc(${scoreInPerCent}% - 10px)` }
              : { marginLeft: `${scoreInPerCent}%` }
          }
          className="air-indicator"
        ></div>
      </div>
      <div>Air quality is {airDescription?.description}</div>
    </div>
  );
};

export default AirPollution;
