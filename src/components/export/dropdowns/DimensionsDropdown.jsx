import React from 'react';
import { useRecoilState } from 'recoil';
import { dimensionsOptionItems } from '@/components/export/optionitems';
import * as state from '@/store';

export default function DimensionsDropdown() {
  const [dimensionIndex, setDimensionIndex] = useRecoilState(
    state.dimensionIndex
  );

  const handleChange = (event) => {
    setDimensionIndex(event.target.value);
  };

  return (
    <>
      <label className='selector_lone'>
        <select value={dimensionIndex} onChange={handleChange}>
          {dimensionsOptionItems}
        </select>
      </label>
    </>
  );
}
