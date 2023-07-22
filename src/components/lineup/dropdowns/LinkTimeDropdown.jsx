import React from 'react';
import { useRecoilState } from 'recoil';
import { linkTimeOptionItems } from '@/components/lineup/optionitems';
import * as state from '@/store';

export default function LinkTimeDropdown() {
  const [linkTime, setLinkTime] = useRecoilState(state.linkTime);
  const handleChange = (event) => {
    setLinkTime(event.target.value);
  };

  return (
    <>
      <label className='label_link-time'>Link Time:&nbsp;</label>
      <label className='selector_lone'>
        <select value={linkTime} onChange={handleChange}>
          <option value=''>Link Time</option>
          {linkTimeOptionItems}
        </select>
      </label>
    </>
  );
}
