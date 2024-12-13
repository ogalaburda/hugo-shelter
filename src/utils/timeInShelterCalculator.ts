export const calculateShelterTime = (dis: string): number | 'unknown' => {
  if (!dis || isNaN(Date.parse(dis))) return 'unknown'; // Handle invalid or empty DISs
  const today = new Date();
  const dateInShelter = new Date(dis);
  const timeInYears = (today.getTime() - dateInShelter.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.ceil(timeInYears * 10) / 10; // Round up to 1 decimal place
};
  