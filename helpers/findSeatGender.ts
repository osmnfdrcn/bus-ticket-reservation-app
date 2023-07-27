export function findSeatGender(array: string[], value: number) {
  if (!Array.isArray(array)) {
    return null;
  }
  for (const element of array) {
    const [seatNumber, gender] = element.split("-");
    const seat = parseInt(seatNumber);
    if (seat === value) {
      return {
        seat: seat,
        gender: gender,
      };
    }
  }
  return null;
}
