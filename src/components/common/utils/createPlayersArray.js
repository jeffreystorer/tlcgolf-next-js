import {
  buildTeeArray,
  returnCourseHandicapArray,
  get,
  getTeeValueFromTeeLabel,
  getTeeLabelFromTeeValue,
  shuffleArray,
} from '@/components/common/utils';

export default function createPlayersArray(
  playersArrayType,
  showLocalNumbers,
  showFirstName,
  course,
  group,
  teesSelected,
  teamTables,
  teeTimeCount,
  sortOrder
) {
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = get('courseData');
  let groups = get('groups');
  let allPlayersInTable = get('allPlayersInTable');
  let playersArray = [];
  let strHcpIndex;
  let hcpIndex;
  let gender;
  //create an array of values of tees selected
  let teesSelectedArray = buildTeeArray(teesSelected);
  /*For a player whose preferred tee is
  not included in the tees selected,
  set the player's tee choice to the first tee selected*/
  allPlayersInTable.forEach(setDummyTee);

  allPlayersInTable.forEach(addRowToPlayersArray);

  switch (playersArrayType) {
    case 'createLineupTable':
      switch (sortOrder) {
        case 'alphabetical':
          sortAlphabetical();
          break;
        case 'byHandicap':
          sortByHandicap();
          break;
        case 'random':
          sortRandom();
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return playersArray;

  /*For a player whose preferred tee is
  not included in the tees selected,
  set the player's tee choice to the first tee selected*/
  function setDummyTee(item, index) {
    const player = item;
    const defaultTeeLabel = player[2];
    let defaultTeeValue = getTeeValueFromTeeLabel(defaultTeeLabel, course);
    let teeNo = teesSelectedArray.indexOf(defaultTeeValue);
    if (teeNo < 0) {
      allPlayersInTable[index][2] = getTeeLabelFromTeeValue(
        teesSelectedArray[0],
        course
      );
    }
  }

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
    let aPlayer = item;
    var newRow = compute(aPlayer, index);
    playersArray.push(newRow);
  }

  //construct the row
  function compute(aPlayer, index) {
    gender = aPlayer[5];
    let teeValue = getTeeValueFromTeeLabel(aPlayer[2], course);
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

    if (playersArrayType === 'createExportLineupTable') {
      if (showFirstName) {
        playerName = firstName + ' ' + lastName + ' (' + strHcpIndex + ')';
      } else {
        playerName = lastName + ' (' + strHcpIndex + ')';
      }
      let prefix = '';
      if ((showLocalNumbers === true) | (showLocalNumbers === 'true')) {
        prefix = local + ' ';
      }
      playerName = prefix + playerName;
    }
    if (playersArrayType === 'createExportTeamsTable') {
      if (showFirstName) {
        playerName = aPlayer[3] + ' ' + aPlayer[1];
      } else {
        playerName = aPlayer[1];
      }

      let prefix = '';
      if (showLocalNumbers === true || showLocalNumbers === 'true') {
        prefix = local + ' ';
      }
      playerName = prefix + playerName;
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
    if (playersArrayType !== 'createExportTeamsTable') {
      const chArray = returnCourseHandicapArray(
        gender,
        strHcpIndex,
        course,
        teesSelected
      );

      playerReturn.courseHandicaps = chArray;
    }
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

  function sortByHandicap() {
    playersArray.sort((a, b) => {
      let aCourseHcp = getCourseHcp(a);
      let bCourseHcp = getCourseHcp(b);
      if (a.strHcpIndex === 'no index') {
        aCourseHcp = 50;
      }
      if (b.strHcpIndex === 'no index') {
        bCourseHcp = 50;
      }
      return aCourseHcp > bCourseHcp
        ? 1
        : aCourseHcp === bCourseHcp
        ? a.lastName > b.lastName
          ? 1
          : -1
        : -1;
    });
  }

  function sortRandom() {
    shuffleArray(playersArray);
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
