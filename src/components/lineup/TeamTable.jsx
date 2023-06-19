import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { TeamTableHeader } from '@/components/lineup';
import {
  TeeChoiceDropdown,
  ManualCHDropdown,
  WalkRideDropdown,
} from '@/components/lineup/dropdowns';
import * as state from '@/store';
import { get, setTeamHcpAndProgs } from '@/components/common/utils';

const TeamTable = ({ teamNumber, teamMembers }) => {
  const course = useRecoilValue(state.course);
  const setTeamTables = useSetRecoilState(state.teamTables);
  const progs069 = useRecoilValue(state.progs069);
  const progAdj = useRecoilValue(state.progAdj);
  const showTeamHcp = true;
  const teesSelected = useRecoilValue(state.teesSelected);
  const groups = get('groups');
  let teamName = 'team' + teamNumber;
  let teamHcp, teamProgs;
  let teamHcpAndProgsValues;
  function setTeamValues() {
    teamHcpAndProgsValues = setTeamHcpAndProgs(
      teamName,
      teamMembers,
      progAdj,
      progs069,
      teesSelected[course]
    );
    teamHcp = teamHcpAndProgsValues[0];
    teamProgs = teamHcpAndProgsValues[1];
  }
  setTeamValues();
  let rows = teamMembers;
  let rowsTD = [];
  let teeCount = teesSelected[course].length;
  let playerCount;
  if (teamMembers) {
    playerCount = teamMembers.length;
  } else {
    playerCount = 0;
  }

  const handleClick = (teamName, id) => (event) => {
    setTeamTables((prevTeamTables) => ({
      ...prevTeamTables,
      [teamName]: prevTeamTables[teamName].filter((player) => player.id !== id),
    }));
    setTeamValues();
  };

  function generateRows() {
    for (let i = 0; i < playerCount; i++) {
      rowsTD[i] = (
        <tr key={rows[i].id}>
          <td></td>
          <td
            className='lineup-table-body_td-left'
            onClick={handleClick(teamName, teamMembers[i].id)}>
            {rows[i].playerName}
          </td>
          {generateCols(i)}
        </tr>
      );
    }
    return rowsTD;
  }

  function generateCols(i) {
    let tds = [];
    for (var j = 0; j < teeCount; j++) {
      if (rows[i].teeChoice === teesSelected[course][j].value) {
        tds[j] = (
          <td className='lineup-table-body_td-other-bold' key={uuidv4()}>
            {rows[i].courseHandicaps[j]}
          </td>
        );
      } else {
        tds[j] = (
          <td className='lineup-table-body_td-other' key={uuidv4()}>
            {rows[i].courseHandicaps[j]}
          </td>
        );
      }
    }

    let aChosenTeeIndex = rows[i].courseHandicaps.indexOf(rows[i].teeChoice);
    let manualCH = rows[i].courseHandicaps[aChosenTeeIndex];

    if (showTeamHcp || progs069 > 0) {
      tds.push(
        <TeeChoiceDropdown
          key={uuidv4()}
          baseTee={rows[i].teeChoice}
          playerId={rows[i].id}
          teamNumber={teamNumber}
        />
      );
    }

    if (groups.slice(-1) === 'Walk') {
      tds.push(
        <WalkRideDropdown
          key={uuidv4()}
          walk={rows[i].walk}
          playerId={rows[i].id}
          teamNumber={teamNumber}
        />
      );
    }

    if (showTeamHcp || progs069 > 0) {
      tds.push(
        <ManualCHDropdown
          key={uuidv4()}
          manualCH={manualCH}
          playerId={rows[i].id}
          teamNumber={teamNumber}
        />
      );
    }

    return tds;
  }

  return (
    <table>
      <thead>
        <TeamTableHeader teamNumber={teamNumber} teamMembers={teamMembers} />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className='lineup-table-footer'>
        <tr>
          <td colSpan={teeCount + 2}>
            {showTeamHcp || progs069 > 0 ? (
              <span>Team Hcp: {teamHcp}</span>
            ) : (
              <></>
            )}
            {progs069 > 0 ? (
              <span>
                &nbsp;&nbsp;Team Progs per {progs069}: {teamProgs}
              </span>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TeamTable;
