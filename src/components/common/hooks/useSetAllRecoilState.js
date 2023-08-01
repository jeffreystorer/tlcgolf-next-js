import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { get } from '@/components/common/utils';
import { getMaxListeners } from 'process';
import * as state from '@/store';

export default function useSetAllRecoilState() {
  const setCourse = useSetRecoilState(state.course);
  const setGroup = useSetRecoilState(state.group);
  const setTeesSelected = useSetRecoilState(state.teesSelected);
  const setCaptains = useSetRecoilState(state.captains);
  const setBets = useSetRecoilState(state.bets);
  const setHasSchedule = useSetRecoilState(state.hasSchedule);
  const setSchedules = useSetRecoilState(state.schedules);
  const setFoundGolfer = useSetRecoilState(state.foundGolfer);
  const setWednesdaySchedules = useSetRecoilState(state.wednesdaySchedules);
  const setGroups = useSetRecoilState(state.groups);
  const setAllPlayersInTable = useSetRecoilState(state.allPlayersInTable);
  const setCourseData = useSetRecoilState(state.courseData);

  const course = get('course');
  const group = get('group');
  const teesSelected = get('teesSelected');
  const captains = get('captains');
  const bets = get('bets');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');
  const foundGolfer = get('foundGolfer');
  const wednesdaySchedules = get('wednesdaySchedules');
  const groups = get('groups');
  const allPlayersInTable = get('allPlayersInTable');
  const courseData = get('courseData');
  useEffect(() => {
    setCourse(course);
    setGroup(group);
    setTeesSelected(teesSelected);
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
