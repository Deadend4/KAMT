export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isNotNegative = (value) => {
  return +value >= 0;
};

const calculationModeHandler = (temp, calculationMode) => {
  const multiplier = calculationMode === 'quasilinear' ? 0.9 : 0.15;
  const gamma = 0.01;
  const mult = multiplier * temp;
  return calculationMode === 'quasilinear'
    ? mult
    : mult - gamma * Math.pow(temp, 3);
}

export const changeCores = ({
  sources,
  plateSize,
  borders,
  timeRange,
  plateStats,
  calculationMode
}) => {
  console.log({
    sources,
    plateSize,
    borders,
    timeRange,
    plateStats,
    calculationMode
  })
  const timeStep = 0.005;
}