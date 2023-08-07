'use client';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { useSaveLineupToFirebase } from '@/components/lineup/hooks';
import * as state from '@/store';

export default function SaveLineup({ snapshots }) {
  const router = useRouter();
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const saveLineupToFirebase = useSaveLineupToFirebase();
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const teesSelected = useRecoilValue(state.teesSelected);
  const idsInLineup = useRecoilValue(state.idsInLineup);
  const [lineupTitle, setLineupTitle] = useRecoilState(state.lineupTitle);
  const playingDate = useRecoilValue(state.playingDate);
  const teamTables = useRecoilValue(state.teamTables);
  const linkTime = useRecoilValue(state.linkTime);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const textareaValue = useRecoilValue(state.textareaValue);
  const progs069 = useRecoilValue(state.progs069);
  const progAdj = useRecoilValue(state.progAdj);
  const playersInLineup = useRecoilValue(state.playersInLineup);
  const setCurrentLineupIndex = useSetRecoilState(state.currentLineupIndex);
  const okToSave = useRecoilValue(state.okToSave);
  const nextLineupIndex = useRecoilValue(state.nextLineupIndex);

  function handleSubmit(event) {
    event.preventDefault();
    saveLineup();
    //increment the lineup index
    if (realGhinNumber !== captainGhinNumber) {
      setCurrentLineupIndex(nextLineupIndex);
    } else {
      setCurrentLineupIndex(snapshots.length);
    }
    router.push('/export');
  }

  function saveLineup() {
    let title = lineupTitle;
    saveLineupToFirebase(
      title,
      idsInLineup,
      playersInLineup,
      group,
      course,
      playingDate,
      teeTimeCount,
      linkTime,
      progs069,
      progAdj,
      teamTables,
      textareaValue,
      teesSelected[course]
    );
  }

  function handleChange(event) {
    setLineupTitle(event.target.value);
  }
  return (
    <form id='save-lineup' onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Save Lineup as:
          <input
            id='lineup-title'
            type='text'
            value={lineupTitle}
            onChange={handleChange}
            size='36'
          />
        </label>
        <button type='submit'>Save Lineup</button>
      </fieldset>
    </form>
  );
}
