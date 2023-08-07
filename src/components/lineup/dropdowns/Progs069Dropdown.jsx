'use client';
import { useRecoilState } from 'recoil';
import * as state from '@/store';

export default function Progs069Dropdown() {
  const [progs069, setProgs069] = useRecoilState(state.progs069);

  const handleChange = (event) => {
    setProgs069(event.target.value);
  };
  return (
    <select value={progs069} onChange={handleChange}>
      <option value=''>Progs?</option>
      <option value='0'>No Progs</option>
      <option value='6'>Progs 6/6/6</option>
      <option value='9'>Progs 9&9</option>
      <option value='18'>Progs 18</option>
    </select>
  );
}
