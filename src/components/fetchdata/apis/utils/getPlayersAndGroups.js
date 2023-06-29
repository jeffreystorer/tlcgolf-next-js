export default function getPlayersAndGroups(values) {
  let playerTable = [];
  let rowCount = values.length;
  let players = values;
  let groups;
  let allPlayersInTable;
  let i;
  for (i = 0; i < rowCount; i++) {
    //test the third column of the header row
    if (players[0][2] !== 'Tee') {
      //deal with legacy table that does not have a tee column
      //add column with tee choice of club
      players[i].splice(2, 0, 'Club');
    }
    playerTable.push(players[i]);
  }
  setGroupsAndPlayers(playerTable);

function setGroupsAndPlayers(playerTable) {
  //remove the GHIN_Number, Last_Name, and Tee from the header row
  playerTable[0].splice(0, 3);
  //Now the header row is just the games, so we add All at beginning.
  playerTable[0].unshift('All');
  groups = playerTable[0];
  //now we remove the header row
  playerTable.splice(0, 1);
  addFirstNameIndexGenderLocalCols(playerTable);
  allPlayersInTable = playerTable;
}

function addFirstNameIndexGenderLocalCols(playerTable) {
  let i;
  for (i = 0; i < playerTable.length; i++) {
    playerTable[i].splice(3, 0, '', '', '', '');
  }
}

  return [groups, allPlayersInTable];
}
