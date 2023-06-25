export default function getSchedules(ghinNumber, values) {
  let allSchedules = [];
  values.forEach(createScheduleObject);

  function createScheduleObject(item) {
    let scheduleObject = { id: item[0], name: item[2], url: item[3] };
    allSchedules.push(scheduleObject);
  }
  let schedules = allSchedules.filter((schedule) => {
    return schedule.id === ghinNumber;
  });

  let hasSchedule = false;
  if (schedules.length > 0) hasSchedule = true;

  return [hasSchedule, schedules];
}
