export const formatVND = amount => {
  if (typeof amount !== 'number') return '';
  return amount.toLocaleString('vi-VN') + ' VND';
};
