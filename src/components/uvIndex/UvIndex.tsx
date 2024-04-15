import { TbUvIndex } from 'react-icons/tb';
import './UvIndex.css';

type UvIndexProps = {
  score: number;
};

const UvIndex = ({ score }: UvIndexProps) => {
  const roundedNumber = score.toFixed(0);

  const uvIndexCategory = (index: number) => {
    if (index <= 2) {
      return { text: 'Low', description: 'No protection required.' };
    } else if (index <= 5) {
      return {
        text: 'Moderate',
        description: 'Stay in the shade near midday.',
      };
    } else if (index <= 7) {
      return { text: 'High', description: 'Wear a hat and sunglasses.' };
    } else if (index <= 10) {
      return {
        text: 'Very high',
        description:
          'Apply sunscreen SPF 30+ every 2 hours and wear sunglasses',
      };
    } else {
      return {
        text: 'Extreme',
        description: 'Apply all your protection.',
      };
    }
  };

  return (
    <div className="uv_index-section">
      <TbUvIndex /> UV Index: {roundedNumber} &#40;{' '}
      {uvIndexCategory(score).text} &#41;
      <div className="uv-meter">
        <div className="uv-indicator"></div>
      </div>
      <div> {uvIndexCategory(score).description} </div>
    </div>
  );
};

export default UvIndex;
