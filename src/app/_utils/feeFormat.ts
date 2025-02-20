export const feeFormat = (fee: string | number): string => {
  const num = typeof fee === 'string' ? parseInt(fee, 10) : fee;
  return num.toLocaleString('ko-KR');
};
