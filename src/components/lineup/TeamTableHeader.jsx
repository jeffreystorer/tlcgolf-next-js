import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { ChevronDown } from 'react-feather';
import { ChevronUp } from 'react-feather';
import * as _ from 'lodash';
import { TitledBox } from '@/components/common';
import { returnHeaderRow, getTeeTimes } from '@/components/common/utils';
import * as options from '@/components/lineup/optionitems';
import * as state from '@/store';

const TeamTableHeader = ({ teamNumber, teamMembers }) => {
  const course = useRecoilValue(state.course);
  const playersNotInTeeTime = useRecoilValue(state.playersNotInTeeTime);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const linkTime = useRecoilValue(state.linkTime);
  const playersInLineup = useRecoilValue(state.playersInLineup);
  const [teamTables, setTeamTables] = useRecoilState(state.teamTables);
  //playerCount is used to size the box
  const playersNotInTeeTimeCount = playersNotInTeeTime.length;
  const [showAddTeamMember, setShowAddTeamMember] = useRecoilState(
    state.showAddTeamMember
  );
  const teesSelected = useRecoilValue(state.teesSelected);
  const times = getTeeTimes(linkTime, teeTimeCount);
  const teamName = 'team' + teamNumber;

  function handleAddTeamMember(name, idToBeAddedToTeam) {
    const optionValues = [idToBeAddedToTeam];
    optionValues.forEach(addPlayer);
    function addPlayer(item, index) {
      let newPlayerObj = playersInLineup.find(
        (player) => player.id === Number(item)
      );
      setTeamTables((prevTeamTables) => ({
        ...prevTeamTables,
        [name]: prevTeamTables[name].concat(newPlayerObj),
      }));
    }
  }

  function handleMoveTeamUp(event, teamNumber) {
    event.preventDefault();
    if (teamNumber > 0) moveTeamUp(teamNumber);
  }

  function moveTeamUp(teamNumber) {
    let newTeamTables = _.cloneDeep(teamTables);
    let teams = [];
    let i;
    let teamName = '';
    for (i = 0; i < teeTimeCount; i++) {
      teamName = 'team' + i;
      teams.push(newTeamTables[teamName]);
    }
    let teamNameGoingUp = 'team' + teamNumber;
    let teamNameGoingDown = 'team' + (teamNumber - 1);
    newTeamTables[teamNameGoingUp] = teams[teamNumber - 1];
    newTeamTables[teamNameGoingDown] = teams[teamNumber];
    setTeamTables(newTeamTables);
  }

  let cols = returnHeaderRow(teesSelected[course]);
  const getHeader = () => {
    cols.shift();
    var keys = cols;
    return keys.map((key, index) => {
      return (
        <th className='lineup-table-header_th-other' key={uuidv4()}>
          {key}
        </th>
      );
    });
  };

  function handleTeeTimeClick() {
    setShowAddTeamMember((prev) => ({
      ...prev,
      [teamName]: true,
    }));
  }

  function handleTeeAssignmentChange(e) {
    let newTeamTables = _.cloneDeep(teamTables);
    newTeamTables.teeAssignments[teamNumber] = e.target.value;
    setTeamTables(newTeamTables);
  }

  function handleDoneClick() {
    setShowAddTeamMember((prev) => ({
      ...prev,
      [teamName]: false,
    }));
  }

  const handleClick = (idToBeAddedToTeam) => (event) => {
    event.preventDefault();
    handleAddTeamMember(teamName, idToBeAddedToTeam);
  };

  function generatePlayersNotInTeeTimeRows() {
    let rowsTD = playersNotInTeeTime.map((player) => (
      <tr key={uuidv4()} onClick={handleClick(player.id)}>
        <td>{player.playerName}</td>
      </tr>
    ));
    return rowsTD;
  }

  return (
    <>
      <>
        {showAddTeamMember[teamName] && playersNotInTeeTimeCount > 0 && (
          <tr key={uuidv4()}>
            <td />
            <td>
              <br />
              <br />
              <TitledBox title={'Add to ' + times[teamNumber] + ' Team'}>
                <table>
                  <tbody>{generatePlayersNotInTeeTimeRows()}</tbody>
                </table>
              </TitledBox>
              <button className='button' onClick={handleDoneClick}>
                Done
              </button>
              <br />
            </td>
          </tr>
        )}
      </>
      <tr>
        <th value onClick={(e) => handleMoveTeamUp(e, teamNumber)}>
          {teamNumber > 0 ? (
            <ChevronUp size='24' strokeWidth='3px' />
          ) : (
            <ChevronUp size='24' strokeWidth='3px' color='white' />
          )}
        </th>
        <th
          className='lineup-table-header_th-left'
          onClick={handleTeeTimeClick}>
          {times[teamNumber]}
          {playersNotInTeeTimeCount > 0 && (
            <span>
              <ChevronDown size='18' strokeWidth='3px' />
            </span>
          )}
          {times[teamNumber].includes('Shotgun') && (
            <select
              className='selector_lone select_dropdown_container'
              name='teeAssignmentDropdown'
              value={teamTables.teeAssignments[teamNumber]}
              onChange={handleTeeAssignmentChange}>
              {options.teeAssignmentOptionItems}
            </select>
          )}
        </th>

        {getHeader()}
      </tr>
    </>
  );
};

export default TeamTableHeader;
