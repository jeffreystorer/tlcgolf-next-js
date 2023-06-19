import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import * as state from '@/store';

import { get, set } from '@/components/common/utils';

const EditTableButton = ({ text = 'Edit Table' }) => {
  const navigate = useNavigate();
  const resetPlayersInLineup = useResetRecoilState(state.playersInLineup);
  const resetCurrentLineupIndex = useResetRecoilState(state.currentLineupIndex);
  const resetCurrentLineup = useResetRecoilState(state.currentLineup);
  const resetLineupTitle = useResetRecoilState(state.lineupTitle);
  const sheetURL = get('sheetURL');

  function handleClick() {
    set('timeStamp', 1);
    resetPlayersInLineup();
    resetCurrentLineupIndex();
    resetCurrentLineup();
    resetLineupTitle();
    navigate('/');
    document.location = sheetURL;
  }

  return (
    <>
      <div className='div--center'>
        <button className='button stacked' onClick={handleClick}>
          {text}
        </button>
      </div>
    </>
  );
};

export default EditTableButton;
