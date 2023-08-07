'use client';
import { useEffect } from 'react';
import {
  useResetRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from 'recoil';
import * as _ from 'lodash';
import {
  buildTeeArray,
  getPlayersInGroup,
  returnCourseHandicapArray,
} from '@/components/common/utils';
import { getGender } from '@/components/lineup/hooks/utils';
import * as state from '@/store';
import { all } from 'axios';

export default function useLoadSavedLineup() {
  const courseData = useRecoilValue(state.courseData);
  const groups = useRecoilValue(state.groups);
  const allPlayersInTable = useRecoilValue(state.allPlayersInTable);
  const setCourse = useSetRecoilState(state.course);
  const setGroup = useSetRecoilState(state.group);
  const setLineupTitle = useSetRecoilState(state.lineupTitle);
  const setPlayingDate = useSetRecoilState(state.playingDate);
  const setTeamTables = useSetRecoilState(state.teamTables);
  const resetTeamTables = useResetRecoilState(state.teamTables);
  const setLinkTime = useSetRecoilState(state.linkTime);
  const setTeeTimeCount = useSetRecoilState(state.teeTimeCount);
  const setTextareaValue = useSetRecoilState(state.textareaValue);
  const setProgs069 = useSetRecoilState(state.progs069);
  const setProgAdj = useSetRecoilState(state.progAdj);
  const setPlayersInLineup = useSetRecoilState(state.playersInLineup);
  const sortOrder = useRecoilValue(state.sortOrder);
  const setMissingPlayerMessage = useSetRecoilState(state.missingPlayerMessage);
  const setTeesSelected = useSetRecoilState(state.teesSelected);

  function loadSavedLineup({
    title,
    playersInLineup,
    players,
    course,
    game,
    linkTime,
    playingDate,
    progs069,
    progAdj,
    teamTables,
    teeTimeCount,
    textareaValue,
    teesSelected,
  }) {
    setGroup(game);
    setCourse(course);
    let missingPlayer = false;
    setTeesSelected((prevTees) => ({
      ...prevTees,
      [course]: teesSelected,
    }));
    setLineupTitle(title);
    setLinkTime(linkTime);
    setPlayingDate(playingDate);
    setProgs069(progs069);
    setProgAdj(progAdj);
    if (teamTables) {
      setTeamTables(teamTables);
    } else {
      resetTeamTables();
    }
    setTeeTimeCount(teeTimeCount);
    setTextareaValue(textareaValue);
    //A saved lineup will not include an empty team
    let teamCount = Object.keys(teamTables).length - 2;
    if (teeTimeCount > teamCount) {
      for (let i = teamCount; i < teeTimeCount; i++) {
        let newTeam = 'team' + i;
        setTeamTables((teamTables) => ({
          ...teamTables,
          [newTeam]: [],
        }));
      }
    }

    checkForPlayersInLineupButNotInTable();
    if (missingPlayer) return;

    //teesSelected below is teesSelected[course]
    const teesSelectedCourse = teesSelected;
    const group = game;
    const playersInGroup = getPlayersInGroup(
      course,
      group,
      teesSelectedCourse,
      teamTables,
      teeTimeCount,
      courseData,
      groups,
      allPlayersInTable
    );
    const teesSelectedArray = buildTeeArray(teesSelectedCourse);
    let newTeamTables = _.cloneDeep(teamTables);
    updateTeamTables();
    let newPlayersInLineupArray = [];
    playersInLineup.forEach((id) => {
      newPlayersInLineupArray.push(
        playersInGroup.find((player) => player.id === Number(id))
      );
    });
    setPlayersInLineup(newPlayersInLineupArray);

    function checkForPlayersInLineupButNotInTable() {
      playersInLineup.forEach(testPlayer);

      function testPlayer(anId, index) {
        let aPlayerObj = players.find((obj) => obj.id === Number(anId));
        let lastName = aPlayerObj.lastName;
        var i = 0;
        var playerFound = false;
        try {
          do {
            playerFound = allPlayersInTable[i][0] === anId.toString();
            i++;
          } while (!playerFound);
          return i - 1;
        } catch (error) {
          missingPlayer = true;
          setMissingPlayerMessage(
            'One of the players in this lineup (GHIN Number: ' +
              anId +
              ', Last Name: ' +
              lastName +
              ') is no longer in your table.  Please delete this lineup or edit your table to add the player.'
          );
          window.location.href = '#missingplayermodal';
        }
      }
    }

    function updateTeamTables() {
      for (let i = 0; i < teeTimeCount; i++) {
        let aTeamName = 'team' + i;
        try {
          let aPlayerCount = newTeamTables[aTeamName].length;
          for (let j = 0; j < aPlayerCount; j++) {
            let aTeamMemberId = newTeamTables[aTeamName][j].id;
            let aPlayerObj = playersInGroup.find(
              (obj) => obj.id === aTeamMemberId
            );
            newTeamTables[aTeamName][j].playerName = aPlayerObj.playerName;
            newTeamTables[aTeamName][j].strHcpIndex = aPlayerObj.strHcpIndex;
            updatePlayerOnTeam(aTeamName, j);
          }
        } catch (error) {
          console.log(
            'useLoadSavedLineup: error updating Team Tables for: ' + aTeamName
          );
        }
      }

      setTeamTables(newTeamTables);

      function updatePlayerOnTeam(teamName, playerIndex) {
        const aTeeChoice = newTeamTables[teamName][playerIndex].teeChoice;
        let teeNo = teesSelectedArray.indexOf(aTeeChoice);
        if (teeNo < 0) teeNo = 0;
        const strHcpIndex = newTeamTables[teamName][playerIndex].strHcpIndex;
        const gender = getGender(
          newTeamTables[teamName][playerIndex].id.toString(),
          allPlayersInTable
        );
        const aManualCH = newTeamTables[teamName][playerIndex].manualCH;
        const playerName = newTeamTables[teamName][playerIndex].playerName;
        if (playerName.endsWith('*')) {
          const newPlayerName = playerName.slice(0, -1);
          newTeamTables[teamName][playerIndex].playerName = newPlayerName;
        }
        switch (aManualCH) {
          case 'Auto':
            newTeamTables[teamName][playerIndex].courseHandicaps =
              returnCourseHandicapArray(
                courseData,
                gender,
                strHcpIndex,
                course,
                teesSelected
              );
            break;
          case '-':
            for (let j = 0; j < teesSelectedArray.length; j++) {
              newTeamTables[teamName][playerIndex].courseHandicaps[j] = 'X';
            }
            break;
          default:
            for (let j = 0; j < teesSelectedArray.length; j++) {
              newTeamTables[teamName][playerIndex].courseHandicaps[j] = '*';
            }
            newTeamTables[teamName][playerIndex].courseHandicaps[teeNo] =
              aManualCH;
            if (
              !newTeamTables[teamName][playerIndex].playerName.endsWith('*')
            ) {
              newTeamTables[teamName][playerIndex].playerName =
                newTeamTables[teamName][playerIndex].playerName + '*';
            }
            break;
        }
      }
    }
  }

  return loadSavedLineup;
}
