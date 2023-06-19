import React from 'react';
import Textarea from 'react-expanding-textarea';
import { useRecoilState } from 'recoil';
import * as state from '@/store';

const LineupTextarea = () => {
  const [textareaValue, setTextareaValue] = useRecoilState(state.textareaValue);
  const handleBlur = (event) => {
    setTextareaValue(event.target.value);
  };
  const handleChange = (event) => {
    setTextareaValue(event.target.value);
  };
  return (
    <>
      <Textarea
        className='textarea'
        cols='41'
        value={textareaValue}
        onChange={handleChange}
        onFocus={(event) => (event.target.value = textareaValue)}
        onBlur={handleBlur}
        placeholder='Enter your bets, entry fee, payouts, and rules here or click the "Choose Game Options" button below to enter them automatically.'
      />
    </>
  );
};

export default LineupTextarea;
