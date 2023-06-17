export const boundedValue = (lowerBound: number, value: number, upperBound: number) => {
  if (value < lowerBound) {
    return lowerBound;
  }
  return value > upperBound ? upperBound : value;
};
