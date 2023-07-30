import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { get } from '@/components/common/utils';
import { getMaxListeners } from 'process';
import * as state from '@/store';

export default function useSetAllRecoilState() {
  const setCaptains = useSetRecoilState(state.captains);
  const setBets = useSetRecoilState(state.bets);
  const setHasSchedule = useSetRecoilState(state.hasSchedule);
  const setSchedules = useSetRecoilState(state.schedules);
  const setFoundGolfer = useSetRecoilState(state.foundGolfer);
  const setWednesdaySchedules = useSetRecoilState(state.wednesdaySchedules);
  const setGroups = useSetRecoilState(state.groups);
  const setAllPlayersInTable = useSetRecoilState(state.allPlayersInTable);
  const setCourseData = useSetRecoilState(state.courseData);

  const captains = get('captains');
  const bets = get('bets');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');
  const foundGolfer = get('foundGolfer');
  const wednesdaySchedules = get('wednesdaySchedules');
  const groups = get('groups');
  const allPlayersInTable = get('allPlayersInTable');
  const courseData = get('courseData');

  function setAllRecoilState() {
    useEffect(() => {
      setCaptains(captains);
      setBets(bets);
      setHasSchedule(hasSchedule);
      setSchedules(schedules);
      setFoundGolfer(foundGolfer);
      setWednesdaySchedules(wednesdaySchedules);
      setGroups(groups);
      setAllPlayersInTable(allPlayersInTable);
      setCourseData(courseData);
    }, []);
  }
  return setAllRecoilState;
}
