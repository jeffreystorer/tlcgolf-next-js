import {
  buildTeeArray,
  returnCourseHandicapArray,
  get,
  getTeeValueFromTeeLabel,
  getTeeLabelFromTeeValue,
  shuffleArray,
} from '@/components/common/utils';

export default function getPlayersInGroup(
  course,
  group,
  teesSelectedCourse,
  teamTables,
  teeTimeCount,
  courseData,
  groups,
  allPlayersInTable
) {
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = courseData;
  let playersArray = [];
  let strHcpIndex;
  let hcpIndex;
  let gender;
  //create an array of values of tees selected
  let teesSelectedArray = buildTeeArray(teesSelectedCourse);

  allPlayersInTable.forEach(addRowToPlayersArray);

  sortAlphabetical();
  return playersArray;

  //filter allPlayersInTable to the players in the group, then add them to the playersarray
  function addRowToPlayersArray(item, index) {
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

  //add a row to the playersArray for each player in the group
  function doAdd(item, index) {
    let aPlayer = JSON.parse(JSON.stringify(item));
    /*For a player whose preferred tee is
    not included in the tees selected,
    set the player's tee choice to the first tee selected*/
    const defaultTeeLabel = aPlayer[2];
    let defaultTeeValue = getTeeValueFromTeeLabel(
      defaultTeeLabel,
      course,
      courseData
    );
    let teeNo = teesSelectedArray.indexOf(defaultTeeValue);
    if (teeNo < 0) {
      const newTee = getTeeLabelFromTeeValue(
        teesSelectedArray[0],
        course,
        courseData
      );
      aPlayer[2] = newTee;
    }
    let player = compute(aPlayer, index);
    playersArray.push(player);
  }

  //construct the row
  function compute(aPlayer, index) {
    gender = aPlayer[5];
    let teeValue = getTeeValueFromTeeLabel(aPlayer[2], course, courseData);
    strHcpIndex = aPlayer[4];
    hcpIndex = strHcpIndex;
    if (strHcpIndex !== 'no index') hcpIndex = parseFloat(strHcpIndex);
    let firstName = aPlayer[3];
    let lastName = aPlayer[1];
    let local = aPlayer[6];
    let playerName = firstName + ' ' + lastName + ' (' + strHcpIndex + ')';
    let walkRide = 'R';
    if (groups.slice(-1) === 'Walk') {
      let walk = aPlayer.slice(-1);
      switch (walk) {
        case 'YES':
          walkRide = 'W';
          break;
        case 'NO':
          walkRide = 'R';
          break;
        default:
          break;
      }
    }
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: playerName,
      courseHandicaps: [],
      teeChoice: teeValue,
      manualCH: 'Auto',
      lastName: lastName,
      index: hcpIndex,
      firstName: firstName,
      strHcpIndex: strHcpIndex,
      walk: walkRide,
    };

    const chArray = returnCourseHandicapArray(
      courseData,
      gender,
      strHcpIndex,
      course,
      teesSelectedCourse
    );
    playerReturn.courseHandicaps = chArray;

    return playerReturn;
  }

  function sortAlphabetical() {
    playersArray.sort((a, b) =>
      a.lastName > b.lastName
        ? 1
        : a.lastName === b.lastName
        ? a.firstName > b.firstName
          ? 1
          : -1
        : -1
    );
  }

  function getCourseHcp(player) {
    let teeChoice = player.teeChoice;
    let teeNo = teesSelectedArray.indexOf(teeChoice);
    if (teeNo < 0) teeNo = 0;
    if (player.courseHandicaps[teeNo] !== 'X') {
      return Number(player.courseHandicaps[teeNo]);
    }
  }
}
