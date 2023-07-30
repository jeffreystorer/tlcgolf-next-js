import { courses } from '@/components/common/data';

export default function createTeeLabels(courseData) {
  let teeLabels = [];
  courses.forEach(createTeeLabelArray);
  function createTeeLabelArray(item) {
    const courseIndex = courses.indexOf(item);
    const mTeeLabels = courseData[0][0][courseIndex];
    const wTeeLabels = courseData[0][1][courseIndex];
    teeLabels[courseIndex] = [mTeeLabels, wTeeLabels];
  }
  return teeLabels;
}
