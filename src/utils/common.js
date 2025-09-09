export const getIdJson = (rawData, key, value) => {
  return (
    rawData?.find(
      item =>
        String(item[key]).trim().toLowerCase() ===
        String(value).trim().toLowerCase(),
    )?.id ?? null
  );
};

export const getCodeJson = (rawData, key, value) => {
  return (
    rawData?.find(
      item =>
        String(item[key]).trim().toLowerCase() ===
        String(value).trim().toLowerCase(),
    )?.ma ?? null
  );
};
