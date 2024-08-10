export function getFormatedDate(date) {
  return `${date.getFullYear()}-${date.getFullMonth()}-${date.getDate()}`;
}

export function getDateMinusDay(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
