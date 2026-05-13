const calculateDynamicPrice = (basePrice, availableSeats) => {
  let finalPrice = basePrice;

  if (availableSeats <= 5) {
    finalPrice += basePrice * 0.2;
  }

  if (availableSeats <= 2) {
    finalPrice += basePrice * 0.3;
  }

  return Math.round(finalPrice);
};

export default calculateDynamicPrice;
