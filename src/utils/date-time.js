export const getCurrentDate = () => {
  const timestamp = Date.now();

  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const getCurrentTime = () => {
  const timestamp = Date.now();

  const date = new Date(timestamp);
  return date.toLocaleTimeString();
};
