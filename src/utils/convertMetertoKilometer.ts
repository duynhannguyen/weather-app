const convertMetertoKilometer = (value: number): string => {
  const convertValue = value / 1000;

  return `${convertValue.toFixed(0)}km`;
};
export default convertMetertoKilometer;
