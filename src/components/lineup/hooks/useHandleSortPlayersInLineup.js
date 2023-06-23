import * as _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { buildTeeArray, shuffleArray } from '@/components/common/utils';

import * as state from '@/store';

export default function useHandleSortPlayersInLineup() {
  const [playersInLineup, setPlayersInLineup] = useRecoilState(
    state.playersInLineup
  );
  const teesSelected = useRecoilValue(state.teesSelected);
  const course = useRecoilValue(state.course);
  let newPlayersInLineup = _.cloneDeep(playersInLineup);
  let teesSelectedArray = buildTeeArray(teesSelected[course]);

  function handleSort(sortOrder) {
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

    function sortAlphabetical() {
      newPlayersInLineup.sort((a, b) =>
        a.lastName > b.lastName
          ? 1
          : a.lastName === b.lastName
          ? a.firstName > b.firstName
            ? 1
            : -1
          : -1
      );
      setPlayersInLineup(newPlayersInLineup);
    }

    function sortByHandicap() {
      newPlayersInLineup.sort((a, b) => {
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
      setPlayersInLineup(newPlayersInLineup);
    }

    function sortRandom() {
      shuffleArray(newPlayersInLineup);
      setPlayersInLineup(newPlayersInLineup);
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
  return handleSort;
}
