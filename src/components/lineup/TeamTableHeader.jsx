import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { ChevronDown } from 'react-feather';
import { ChevronUp } from 'react-feather';
import * as _ from 'lodash';
import { TitledBox } from '@/components/common';
import { get, returnHeaderRow, getTeeTimes } from '@/components/common/utils';
import * as options from '@/components/lineup/optionitems';
import * as state from '@/store';

const TeamTableHeader = ({ teamNumber, teamMembers }) => {
  const course = get('course');
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
  const teesSelected = get('teesSelected');
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
        <th scope='col' key={uuidv4()}>
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

  function generatePlayersNotInTeeTimeListItems() {
    let listItems = playersNotInTeeTime.map((player) => (
      <li key={uuidv4()} onClick={handleClick(player.id)}>
        {player.playerName}
      </li>
    ));
    return listItems;
  }

  return (
    <thead>
      {showAddTeamMember[teamName] && playersNotInTeeTimeCount > 0 && (
        <tr key={uuidv4()}>
          <th scope='col' colSpan={teesSelected[course].length + 4}>
            <div className='titled_inner'>
              <h3>{'Add to ' + times[teamNumber] + ' Team'}</h3>
              <ul id='players-not-in-tee-time'>
                {generatePlayersNotInTeeTimeListItems()}
              </ul>
              <button className='not-stacked' onClick={handleDoneClick}>
                Done
              </button>
            </div>
          </th>
        </tr>
      )}
      <tr>
        <th scope='col' onClick={(e) => handleMoveTeamUp(e, teamNumber)}>
          {teamNumber > 0 ? (
            <ChevronUp size='24' strokeWidth='3px' />
          ) : (
            <ChevronUp size='24' strokeWidth='3px' color='white' />
          )}
        </th>
        <th scope='col' onClick={handleTeeTimeClick}>
          {times[teamNumber]}
          {playersNotInTeeTimeCount > 0 && (
            <span>
              <ChevronDown size='24' strokeWidth='3px' />
            </span>
          )}
          {times[teamNumber].includes('Shotgun') && (
            <div className='select-dropdown-container'>
              <select
                name='teeAssignmentDropdown'
                value={teamTables.teeAssignments[teamNumber]}
                onChange={handleTeeAssignmentChange}>
                {options.teeAssignmentOptionItems}
              </select>
            </div>
          )}
        </th>
        {getHeader()}
      </tr>
    </thead>
  );
};

export default TeamTableHeader;
