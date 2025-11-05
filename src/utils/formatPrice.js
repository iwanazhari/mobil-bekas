export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatMileage = (mileage) => {
  return new Intl.NumberFormat('id-ID').format(mileage);
};

