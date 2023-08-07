import React from 'react';
import { useRecoilState } from 'recoil';
import { dimensionsOptionItems } from '@/components/export/optionitems';
import * as state from '@/store';

export default function DimensionsDropdown() {
  const [dimensionIndex, setDimensionIndex] = useRecoilState(
    state.dimensionIndex
  );

  const handleDimensionIndexChange = (event) => {
    setDimensionIndex(event.target.value);
  };

  return (
    <>
      <label>
        Select PDF Format
        <select value={dimensionIndex} onChange={handleDimensionIndexChange}>
          {dimensionsOptionItems}
        </select>
      </label>
    </>
  );
}
