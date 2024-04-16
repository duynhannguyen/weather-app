import { TbUvIndex } from 'react-icons/tb';
import './UvIndex.css';

type UvIndexProps = {
  score: number;
};

const UvIndex = ({ score }: UvIndexProps) => {
  const roundedNumber = score.toFixed(0);

  const uvIndexCategory = (index: number) => {
    if (index <= 2) {
      return {
        text: 'Low',
        description: 'No protection required.',
        background: 'rgba(126, 212, 87, 1)',
      };
    } else if (index <= 5) {
      return {
        text: 'Moderate',
        description: 'Stay in the shade near midday.',
        background: ' rgba(248, 212, 73, 1)',
      };
    } else if (index <= 7) {
      return {
        text: 'High',
        description: 'Wear a hat and sunglasses.',
        background: ' rgb(252, 164, 14) ',
      };
    } else if (index <= 10) {
      return {
        text: 'Very high',
        description:
          'Apply sunscreen SPF 30+ every 2 hours and wear sunglasses',
        background: 'rgba(178, 34, 34, 1)',
      };
    } else {
      return {
        text: 'Extreme',
        description: 'Apply all your protection.',
        background: 'rgb(181, 50, 252)',
      };
    }
  };

  return (
    <div
      style={{
        background: uvIndexCategory(score).background,
        boxShadow: `1px 1px 10px 1px ${uvIndexCategory(score).background} `,
      }}
      className="uv_index-section"
    >
      <TbUvIndex /> UV Index: {roundedNumber} &#40;{' '}
      {uvIndexCategory(score).text} &#41;
      <div className="uv-meter">
        <div
          style={{ marginLeft: `${score * 10}%` }}
          className="uv-indicator"
        ></div>
      </div>
      <div> {uvIndexCategory(score).description} </div>
    </div>
  );
};

export default UvIndex;
