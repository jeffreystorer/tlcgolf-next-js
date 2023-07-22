import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash';
import {
  ActiveLineup,
  LineupTeamTable,
  TeamsTeamTable,
} from '@/components/export/activelineup';
import {
  get,
  set,
  createPlayersArray,
  createProgAdjMessage,
  getCourseName,
  getTeeTimes,
} from '@/components/common/utils';

export default function ActiveLineupContainer({
  showFirstName,
  showTeamHcp,
  showLocalNumbers,
  showIndividualHandicaps,
}) {
  const lineup = get('lineup');
  let courseName = getCourseName(lineup.course);
  const progAdjMessage = createProgAdjMessage(lineup.progAdj, lineup.progs069);
  const times = getTeeTimes(lineup.linkTime, lineup.teeTimeCount);
  let textAreaRowCount;
  if (lineup.textAreaRowCount > 0) {
    textAreaRowCount = lineup.textAreaRowCount;
    set('textAreaRowCount', textAreaRowCount);
  } else {
    textAreaRowCount = 8;
  }

  let notUsed = '';
  let lineupPlayersArray = createPlayersArray(
    'createExportLineupTable',
    showLocalNumbers,
    showFirstName,
    lineup.course,
    lineup.game,
    lineup.teesSelected,
    lineup.teamTables,
    lineup.teeTimeCount,
    'alphabetical'
  );

  let teamsPlayersArray = createPlayersArray(
    'createExportTeamsTable',
    showLocalNumbers,
    showFirstName,
    lineup.course,
    lineup.game,
    lineup.teesSelected,
    notUsed,
    notUsed,
    'alphabetical'
  );

  let lineupTeamTables = updateLineupTeamTables();
  let teamsTeamTables = updateTeamsTeamTables();
  let lineupTeamMembers = [];
  let teamsTeamMembers = [];

  function updateLineupTeamTables() {
    let teamTables = _.cloneDeep(lineup.teamTables);
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = 'team' + i;
      try {
        let aPlayerCount = teamTables[aTeamName].length;
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id;
          let aPlayerObj = lineupPlayersArray.find(
            (obj) => obj.id === aTeamMemberId
          );
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
          teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps;
        }
      } catch (error) {
        console.log('error updating Lineup Team Tables');
      }
    }
    return teamTables;
  }
  function updateTeamsTeamTables() {
    let teamTables = _.cloneDeep(lineup.teamTables);
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = 'team' + i;
      try {
        let aPlayerCount = teamTables[aTeamName].length;
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id;
          let aPlayerObj = teamsPlayersArray.find(
            (obj) => obj.id === aTeamMemberId
          );
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
        }
      } catch (error) {
        console.log('error updating Teams Team Tables');
      }
    }
    return teamTables;
  }

  function setManualCHCourseHandicaps(teamMembers) {
    //iterate through teamMembers
    try {
      for (let i = 0; i < teamMembers.length; i++) {
        let aTeeChoice = teamMembers[i].teeChoice;
        let aManualCH = teamMembers[i].manualCH;
        if (aManualCH !== 'Auto') {
          let teesSelectedArray = lineup.teesSelected.map((a) => a.value);
          let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice);
          if (aManualCH !== '-') {
            for (let j = 0; j < teesSelectedArray.length; j++) {
              teamMembers[i].courseHandicaps[j] = '*';
            }
            teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH;
            teamMembers[i].playerName = teamMembers[i].playerName + '*';
          } else {
            for (let j = 0; j < teesSelectedArray.length; j++) {
              teamMembers[i].courseHandicaps[j] = 'X';
            }
          }
        }
      }
    } catch (error) {
      console.log('error setting ManualCourseHandicaps');
    }
  }

  let LineupTeamTables = [];
  function generateExportLineupTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = 'team' + i;
      lineupTeamMembers = lineupTeamTables[teamName];
      setManualCHCourseHandicaps(lineupTeamMembers);
      LineupTeamTables[i] = (
        <LineupTeamTable
          key={uuidv4()}
          showTeamHcp={showTeamHcp}
          teamNumber={i}
          times={times}
          teamTables={lineupTeamTables}
          teamMembers={lineupTeamMembers}
          progAdj={lineup.progAdj}
          progs069={lineup.progs069}
          teesSelected={lineup.teesSelected}
        />
      );
    }
    return LineupTeamTables;
  }

  let TeamsTeamTables = [];
  function generateExportTeamsTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = 'team' + i;
      teamsTeamMembers = teamsTeamTables[teamName];
      TeamsTeamTables[i] = (
        <TeamsTeamTable
          key={uuidv4()}
          teamNumber={i}
          times={times}
          teamTables={teamsTeamTables}
          teamMembers={teamsTeamMembers}
        />
      );
    }
    return TeamsTeamTables;
  }

  return (
    <ActiveLineup
      lineup={lineup}
      courseName={courseName}
      showIndividualHandicaps={showIndividualHandicaps}
      generateExportLineupTeamTables={generateExportLineupTeamTables}
      generateExportTeamsTeamTables={generateExportTeamsTeamTables}
      progAdjMessage={progAdjMessage}
    />
  );
}
