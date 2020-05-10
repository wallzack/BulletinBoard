export const displayTime = dateObj => {
  const date = dateObj.toString().slice(0, 10);
  const time = dateObj.toString().substr(11, 5);
  return `${date}, ${time}`;
};