export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isNotNegative = (value) => {
  return +value >= 0;
};
