'use client';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as state from '@/store';

export default function ProgAdjDropdown() {
  const [progAdj, setProgAdj] = useRecoilState(state.progAdj);
  const progs069 = useRecoilValue(state.progs069);
  const handleChange = (event) => {
    setProgAdj(event.target.value);
  };

  if (progs069 === '' || progs069 === '0') return false;

  return (
    <select value={progAdj} onChange={handleChange}>
      <option value=''>Prog Adj?</option>
      <option value='0'>No Adj</option>
      <option value='3'>3 plus 3</option>
      <option value='4'>4 minus 3</option>
    </select>
  );
}
