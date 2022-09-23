export function convertBRDateToDate(date: string) {
  const [day, month, year] = date.split("/");

  const dateFormatted = new Date(`${month}-${day}-${year}`);

  return dateFormatted;
}
