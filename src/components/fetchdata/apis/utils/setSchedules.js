import { get, set } from '@/components/common/utils';

export default function setSchedules(values) {
  let allSchedules = [];
  values.forEach(createScheduleObject);

  function createScheduleObject(item) {
    let scheduleObject = { id: item[0], name: item[2], url: item[3] };
    allSchedules.push(scheduleObject);
  }
  const ghinNumber = get('ghinNumber');
  let schedules = allSchedules.filter((schedule) => {
    return schedule.id === ghinNumber;
  });

  set('schedules', schedules);
  if (schedules.length > 0) set('hasSchedule', true);
}
