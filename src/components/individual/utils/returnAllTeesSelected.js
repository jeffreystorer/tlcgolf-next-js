import { courses, teeValues } from '@/components/common/data';

export default function returnAllTeesSelected(teesSelected) {
  let allTees = [];
  courses.forEach(pushTees);

  function pushTees(item) {
    const course = item;
    allTees.push(teesSelected[course]);
  }
  let allTeesCombined = [];
  allTees.forEach(combine);
  function combine(item) {
    let courseTeeArray = item;
    courseTeeArray.forEach(pushObj);
    function pushObj(item) {
      let teeObj = item;
      allTeesCombined.push(teeObj);
    }
  }

  const allTeesSelected = allTeesCombined.filter(function (obj) {
    const key = obj.value;
    if (!this[key]) {
      this[key] = true;
      return true;
    }
    return null;
  }, Object.create(null));

  const teeArray = teeValues.map((val) => {
    let tee = allTeesSelected.find((obj) => {
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

  return filteredTeeArray;
}
