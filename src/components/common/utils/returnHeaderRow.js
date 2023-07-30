export default function returnHeaderRow(teesSelectedCourse) {
  console.log('😊😊 teesSelectedCourse', teesSelectedCourse);
  let teesSelectedArray = teesSelectedCourse.map((a) => a.value);
  //add a blank column over the player
  teesSelectedArray.unshift('');
  return teesSelectedArray;
}
