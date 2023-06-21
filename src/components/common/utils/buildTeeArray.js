//build array of tees
export default function buildTeeArray(teesSelected) {
  let teesSelectedArray = [];
  try {
    teesSelectedArray = teesSelected.map((a) => a.value);
  } catch (error) {
    console.log(error + ': error building teesSelectedArray');
  }
  return teesSelectedArray;
}
