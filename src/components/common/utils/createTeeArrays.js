import { teeValues, courses } from '@/components/common/data';
import { get } from '@/components/common/utils';

export default function createTeeArrays() {
  const courseData = get('courseData');
  let filteredTeeArrays = [];
  courses.forEach(createFilteredTeeArray);
  function createFilteredTeeArray(item) {
    const course = item;
    const courseIndex = courses.indexOf(course);
    const mTeeLabels = courseData[0][0][courseIndex];
    const mTeeValues = courseData[1][0][courseIndex];
    const wTeeLabels = courseData[0][1][courseIndex];
    const wTeeValues = courseData[1][1][courseIndex];
    const allTeeLabels = mTeeLabels.concat(wTeeLabels);
    const uniqueLabels = [...new Set(allTeeLabels)];
    const allTeeValues = mTeeValues.concat(wTeeValues);
    const uniqueValues = [...new Set(allTeeValues)];
    teeValues.filter((value) => uniqueValues.indexOf(value) > -1);
    let uniqueArray = [];
    let i;
    for (i = 0; i < uniqueValues.length; i++) {
      let obj = { value: uniqueValues[i], label: uniqueLabels[i] };
      uniqueArray.push(obj);
    }

    const teeArray = teeValues.map((val) => {
      let tee = uniqueArray.find((obj) => {
        return obj.value === val;
      });
      if (tee) {
        let entry = {
          value: val,
          label: tee.label,
        };
        return entry;
      } else {
        return null;
      }
    });
    let filteredTeeArray = teeArray.filter((val) => val !== null);
    filteredTeeArrays.push(filteredTeeArray);
  }
  return filteredTeeArrays;
}
