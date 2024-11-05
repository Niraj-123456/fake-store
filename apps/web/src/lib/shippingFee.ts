export const deliveryMethods = {
  STANDARD: {
    value: "STANDARD",
    label: "Standard",
    period: "3 to 5",
    price: 4,
  },
  EXPRESS: { value: "EXPRESS", label: "Express", period: "1 to 2", price: 10 },
};

export const mapShippingEnumToObj = (key: keyof typeof deliveryMethods) => {
  return deliveryMethods[key];
};
