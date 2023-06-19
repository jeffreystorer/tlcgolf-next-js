import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const realGhinNumber = useRecoilValue(state.realGhinNumber);
  const captainGhinNumber = useRecoilValue(state.captainGhinNumber);
  const saveLineupToFirebase = useSaveLineupToFirebase();
  const [modalShow, setModalShow] = useState(false);
  const resetTextareaValue = useResetRecoilState(state.textareaValue);
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
    if (playingDate === 'Date') {
      toast.error('📅Please select a Playing Date📅', {
        position: 'bottom-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
  }

  function handleChange(event) {
    setLineupTitle(event.target.value);
  }

  function handleShowModal() {
    setModalShow(true);
  }

  function handleClearGame() {
    resetTextareaValue();
  }

  if (loading) {
    return (
      <>
        {okToSave ? (
          <>
            <button className='button stacked' onClick={handleShowModal}>
              Choose Game Options
            </button>
            <button className='button stacked' onClick={handleClearGame}>
              Clear Game
            </button>
            <br />
            <br />
            <GameOptionsModal show={modalShow} setShow={setModalShow} />
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
                className='button stacked'
                onClick={handleClick}>
                Save Lineup
              </button>
            </TitledBox>

            <br />
            <ToastContainer
              position='bottom-center'
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        ) : null}
      </>
    );
  }

  return <Navigate replace to='/export' />;
}
