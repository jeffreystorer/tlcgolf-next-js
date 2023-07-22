import React from 'react';
import { useRecoilState } from 'recoil';
import { playingDateOptionItems } from '@/components/lineup/optionitems';
import * as state from '@/store';

export default function PlayingDateDropdown() {
  const [playingDate, setPlayingDate] = useRecoilState(state.playingDate);

  const handleChange = (event) => {
    setPlayingDate(event.target.value);
  };

  return (
    <>
      <label className='selector_left'>
        <select value={playingDate} onChange={handleChange}>
          <option value='Date'>Playing Date</option>
          {playingDateOptionItems}
        </select>
      </label>
    </>
  );
}
