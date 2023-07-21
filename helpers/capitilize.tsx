export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  const firstLetter = str.charAt(0).toUpperCase();
  const restOfTheString = str.slice(1).toLowerCase();
  return firstLetter + restOfTheString;
};
