export default function getWednesdaySchedules(values) {
  let i;
  let schedules = [];
  for (i = 1; i < values.length; i++) {
    if (values[i][3] === 'Y' || values[i][3] === 'C') {
      schedules.push(values[i][0]);
    }
  }
  return schedules;
}
