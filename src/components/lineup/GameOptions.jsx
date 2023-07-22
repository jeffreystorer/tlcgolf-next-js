import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRecoilValue } from 'recoil';
import {
  entryPerOptionItems,
  grossupOptionItems,
  holesOptionItems,
  puttsOptionItems,
  rulesOptionItems,
} from '@/components/lineup/optionitems';
import * as state from '@/store';

export default function GameOptions({
  handleHolesChange,
  getMax,
  handleBetChange,
  handleFirstPayoutChange,
  handleSecondPayoutChange,
  handleThirdPayoutChange,
  handleGrossupChange,
  handleEntryChange,
  handleEntryPerChange,
  handleRulesChange,
  handlePuttsChange,
}) {
  const [maxChecked, setMaxChecked] = useState(false);
  const betsArray = useRecoilValue(state.betsArray);
  const betsOptionItems = betsArray.map((item) => (
    <option key={uuidv4()} value={item}>
      {item}
    </option>
  ));

  function handleMaxChange() {
    setMaxChecked(!maxChecked);
    getMax(!maxChecked);
  }

  return (
    <>
      {/* <div>
        <Form.Select onChange={handleHolesChange}>
          <option>Select Number of Holes For Each Bet</option>
          {holesOptionItems}
        </Form.Select>
        <Form.Select onChange={handleBetChange}>
          <option>Select Bet</option>
          {betsOptionItems}
        </Form.Select>
        <Form>
          <Form.Check
            onChange={handleMaxChange}
            checked={maxChecked}
            type='checkbox'
            id='max'
            label='Net double bogey max.?'
          />
        </Form>
        <Form.Select onChange={handleGrossupChange}>
          <option>Gross Up?</option>
          {grossupOptionItems}
        </Form.Select>
        <Form.Select onChange={handleEntryPerChange}>
          <option>Entry per player or team?</option>
          {entryPerOptionItems}
        </Form.Select>
        <Form>
          <Form.Label htmlFor='entry'>Entry:</Form.Label>
          <InputSpinner
            type={'int'}
            precision={0}
            max={100}
            min={0}
            step={1}
            value={0}
            onChange={handleEntryChange}
            variant={'primary'}
            size='sm'
          />
        </Form>
        <Form>
          <Form.Label htmlFor='first'>Payout for 1st:</Form.Label>
          <InputSpinner
            type={'int'}
            precision={0}
            max={100}
            min={0}
            step={1}
            value={0}
            onChange={handleFirstPayoutChange}
            variant={'primary'}
            size='sm'
          />
        </Form>
        <Form>
          <Form.Label htmlFor='first'>Payout for 2nd:</Form.Label>
          <InputSpinner
            type={'int'}
            precision={0}
            max={100}
            min={0}
            step={1}
            value={0}
            onChange={handleSecondPayoutChange}
            variant={'primary'}
            size='sm'
          />
        </Form>
        <Form>
          <Form.Label htmlFor='first'>Payout for 3rd:</Form.Label>
          <InputSpinner
            type={'int'}
            precision={0}
            max={100}
            min={0}
            step={1}
            value={0}
            onChange={handleThirdPayoutChange}
            variant={'primary'}
            size='sm'
          />
        </Form>
        <Form.Select onChange={handleRulesChange}>
          <option>Winter or Summer rules?</option>
          {rulesOptionItems}
        </Form.Select>
        <Form.Select onChange={handlePuttsChange}>
          <option>Putts Good?</option>
          {puttsOptionItems}
        </Form.Select>
      </div> */}
    </>
  );
}
