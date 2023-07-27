export const createBusSeats = () => {
  //otobusun koltuk duzeni
  // 5li grid, 3n+3 nolu elemanin value'su yok, sadece value'su olan elemanlar ekrana yazdirilacak
  //1 2   3 4
  //5 6   7 8
  const specialIds = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48]; //3n+3 nolu koltukar
  const busSeats: { id: number; value: number | null }[] = [];
  let valueToAdd = 1;
  for (let i = 1; i <= 50; i++) {
    if (specialIds.includes(i)) {
      busSeats.push({
        id: i,
        value: null,
      });
    } else {
      busSeats.push({
        id: i,
        value: valueToAdd,
      });
      valueToAdd++;
    }
  }
  return busSeats;
};
