const convertSpeedMToKm = (speed: number): string => {
  const convertValue = speed * 3.6;
  return `${Math.floor(convertValue).toFixed(0)}km/h`;
};
export default convertSpeedMToKm;
