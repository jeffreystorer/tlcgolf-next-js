'use client';
import { useRecoilValue } from 'recoil';
import { returnCourseHandicapArray, get } from '@/components/common/utils';
import * as state from '@/store';

export default function useReturnBodyRows() {
  const groups = useRecoilValue(state.groups);
  const allPlayersInTable = useRecoilValue(state.allPlayersInTable);
  const showLocalNumbers = useRecoilValue(state.showLocalNumbers);
  const courseData = useRecoilValue(state.courseData);
  const course = get('course');
  const group = get('group');
  const teesSelected = get('teesSelected');

  function returnBodyRows() {
    //declare some variables
    var rows = [];
    let strHcpIndex;
    let gender;

    //filter players, then add them
    function addRow(item, index) {
      let groupNumber = groups.indexOf(group);
      switch (groupNumber) {
        case 0:
          doAdd(item, index);
          break;
        default:
          let groupIndex = groupNumber + 6;
          if (item[groupIndex].toUpperCase() === 'YES') doAdd(item, index);
      }
    }

    //construct the row
    function compute(aPlayer, index) {
      let rowReturn = [];
      rowReturn[0] = aPlayer[0];
      strHcpIndex = aPlayer[4];
      let firstName = aPlayer[3];
      let lastName = aPlayer[1];
      gender = aPlayer[5];
      let local = aPlayer[6];
      let prefix = '';
      if ((showLocalNumbers === true) | (showLocalNumbers === 'true'))
        prefix = local + ' ';
      let player =
        prefix + firstName + ' ' + lastName + ' (' + strHcpIndex + ')';
      rowReturn[1] = returnCourseHandicapArray(
        courseData,
        gender,
        strHcpIndex,
        course,
        teesSelected[course]
      );
      rowReturn[1].unshift(player);
      return rowReturn;
    }

    //add a row for each player
    function doAdd(item, index) {
      const aPlayer = item;
      const newRow = compute(aPlayer, index);
      rows.push(newRow);
    }

    allPlayersInTable.forEach(addRow);
    return rows;
  }
  return returnBodyRows;
}
