import { useRecoilValue } from 'recoil';
import { courses } from '@/components/common/data';
import { returnCourseHandicapArray } from '@/components/common/utils';

export default function useReturnBodyRows() {
  const teesSelectedSaturday = useRecoilValue(state.teesSelectedSaturday);
  const allPlayersInTable = useRecoilValue(state.allPlayersInTable);
  const groups = useRecoilValue(state.groups);

  function returnBodyRows() {
    teesSelected = teesSelectedSaturday;
    const groupIndex = groups.indexOf('Saturday') + 6;

    //declare some variables
    let rows = [];
    let strHcpIndex;
    //let hcpIndex;
    let gender;

    //filter players, then add them
    function addRow(item, index) {
      if (
        item[groupIndex] === 'Yes' ||
        item[groupIndex] === 'YES' ||
        item[groupIndex] === 'yes'
      ) {
        doAdd(item, index);
      }
    }

    //construct the row
    function compute(aPlayer, index) {
      let rowReturn = [];
      rowReturn[0] = aPlayer[0];
      strHcpIndex = aPlayer[4];
      let lastName = aPlayer[1];
      gender = aPlayer[5];
      let player = lastName + ' (' + strHcpIndex + ')';
      rowReturn[1] = [player];
      courses.forEach(pushHandicaps);
      function pushHandicaps(item, index) {
        let course = item;

        const courseHandicaps = returnCourseHandicapArray(
          gender,
          strHcpIndex,
          course,
          teesSelected[course]
        );
        courseHandicaps.forEach(pushCH);
        function pushCH(item) {
          rowReturn[1].push(item);
        }
      }
      return rowReturn;
    }

    //add a row for each player
    function doAdd(item, index) {
      const aPlayer = item;
      const newRow = compute(aPlayer, index);
      rows.push(newRow);
    }

    players.forEach(addRow);
    return rows;
  }
  return returnBodyRows;
}
