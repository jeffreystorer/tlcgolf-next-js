import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from 'recoil';
import { TitledBox } from '@/components/common';
import { GameOptionsModal } from '@/components/lineup';
import { useSaveLineupToFirebase } from '@/components/lineup/hooks';
import * as state from '@/store';
import { get } from '@/components/common/utils';

export default function SaveLineupBox({ snapshots }) {
  const router = useRouter();
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const saveLineupToFirebase = useSaveLineupToFirebase();
  const [modalShow, setModalShow] = useState(false);
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
  const [loading, setLoading] = useState(true);

  function handleClick(event) {
    event.preventDefault();
    saveLineup();
    //increment the lineup index
    if (realGhinNumber !== captainGhinNumber) {
      setCurrentLineupIndex(get('nextLineupIndex'));
    } else {
      setCurrentLineupIndex(snapshots.length);
    }
    setLoading(false);
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

  if (loading) {
    return (
      <>
        {okToSave ? (
          <TitledBox title={'Save lineup as:'}>
            <input
              className='lineup-title'
              type='text'
              value={lineupTitle}
              onChange={handleChange}
              size='36'
            />
            <br />
            <br />
            <button
              id='handleSaveLineupClick'
              className='stacked'
              onClick={handleClick}>
              Save Lineup
            </button>
          </TitledBox>
        ) : null}
      </>
    );
  }
  router.push('/');

  return false;
}
