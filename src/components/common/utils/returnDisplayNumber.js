import * as courseData from '@/components/common/data';

export default function returnDisplayNumber(course, group, groups) {
  let displayNumber = 1;
  if (groups.includes(group) && courseData.courses.includes(course)) {
    //we can display everything
    displayNumber = 2;
  }

  return displayNumber;
}
