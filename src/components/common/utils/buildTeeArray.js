//build array of tees
export default function buildTeeArray(teesSelectedCourse) {
  let teesSelectedArray = [];
  if (teesSelectedCourse) {
    try {
      teesSelectedArray = teesSelectedCourse.map((a) => a.value);
    } catch (error) {
      console.log(error + ': error building teesSelectedArray');
    }
  }
  return teesSelectedArray;
}
