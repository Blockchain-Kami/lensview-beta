export const getDifferenceInDaysHelperUtil = (lastUpdate: Date) => {
  const today = new Date();
  const timeDiff = Math.abs(today.getTime() - lastUpdate.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
