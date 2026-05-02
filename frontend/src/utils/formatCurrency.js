export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatCompactCurrency = (amount) => {
  const value = Number(amount) || 0;
  const absValue = Math.abs(value);

  if (absValue >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  }

  if (absValue >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  }

  // if (absValue >= 1000) {
  //   return `₹${(value / 1000).toFixed(1)}K`;
  // }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};