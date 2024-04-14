type AirQualityIndex = {
  rating: number;
  description: string;
  background: string;
};

export const airQualityIndex: AirQualityIndex[] = [
  {
    rating: 20,
    description: 'Good',
    background: 'rgba(58, 110, 180, 1)',
  },
  {
    rating: 40,
    description: 'Fair',
    background: 'rgba(126, 212, 87, 1)',
  },
  {
    rating: 60,
    description: 'Moderate',
    background: 'rgba(248, 212, 73, 1)',
  },
  {
    rating: 80,
    description: 'Poor',
    background: 'rgb(252, 164, 14)',
  },
  {
    rating: 100,
    description: 'Very Poor',
    background: 'rgba(178, 34, 34, 1)',
  },
];
