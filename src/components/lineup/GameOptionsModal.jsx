import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { GameOptions } from '@/components/lineup';
import * as state from '@/store';

export default function GameOptionsModal({ show, setShow }) {
  const setTextareaValue = useSetRecoilState(state.textareaValue);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const playerCount = useRecoilValue(state.playerCount);
  const excessPayoutMessage =
    'You are paying out more than the pot.  Please adjust your payouts.';
  const missingHolesMessage = 'Please select the number of holes for each bet.';

  let [holes, max, bet, grossup, entry, entryPer, rules, putts] =
    Array(8).fill('');

  let [firstPayout, secondPayout, thirdPayout] = Array(3).fill(0);

  let pot;
  function computePot(entry) {
    switch (entryPer) {
      case '/player':
      case '':
        pot = playerCount * entry;
        break;
      case '/team':
        pot = teeTimeCount * entry;
        break;
      default:
        break;
    }
  }

  function computeRemainder() {
    let remainder;
    let payoutTotal = firstPayout + secondPayout + thirdPayout;
    switch (holes) {
      case '6/6/6':
        remainder = pot - payoutTotal * 3;
        return remainder;
      case '9&9':
        remainder = pot - payoutTotal * 2;
        return remainder;
      case '18':
        remainder = pot - payoutTotal;
        return remainder;
      default:
        break;
    }
  }

  const handleCancel = () => setShow(false);

  function handleSetOptions() {
    computePot(entry);
    if (holes !== '6/6/6' && holes !== '9&9' && holes !== '18') {
      alert(missingHolesMessage);
      return;
    }
    const remainder = computeRemainder();
    if (remainder < 0) {
      alert(excessPayoutMessage);
      return;
    }
    let textareaValue = holes + ' ' + bet;
    if (max !== '') textareaValue = textareaValue + '\n' + max;
    if (grossup !== '') textareaValue = textareaValue + '\n' + grossup;
    textareaValue =
      textareaValue +
      '\n' +
      'Entry: $' +
      entry +
      entryPer +
      '  Pot: $' +
      pot +
      '  ';
    if (thirdPayout > 0) textareaValue = textareaValue + '\n';
    textareaValue = textareaValue + 'Payout: $' + firstPayout;
    if (secondPayout > 0) textareaValue = textareaValue + '/$' + secondPayout;
    if (thirdPayout > 0) textareaValue = textareaValue + '/$' + thirdPayout;
    if (remainder > 0)
      textareaValue =
        textareaValue +
        '\nRemaining pot of $' +
        remainder +
        ' for [insert bet]';
    if (rules !== '') textareaValue = textareaValue + '\n' + rules;
    if (putts !== '') textareaValue = textareaValue + '\n' + putts;

    setTextareaValue(textareaValue);
    holes = '';
    setShow(false);
  }

  function handleHolesChange(event) {
    holes = event.target.value;
  }

  function getMax(checked) {
    if (checked) max = 'Net double bogey max.';
  }
  function handleBetChange(event) {
    bet = event.target.value;
  }

  function handleFirstPayoutChange(event) {
    firstPayout = event;
  }

  function handleSecondPayoutChange(event) {
    secondPayout = event;
  }

  function handleThirdPayoutChange(event) {
    thirdPayout = event;
  }

  function handleGrossupChange(event) {
    grossup = event.target.value;
  }

  function handleEntryChange(event) {
    entry = event;
  }

  function handleEntryPerChange(event) {
    entryPer = event.target.value;
  }

  function handleRulesChange(event) {
    rules = event.target.value;
  }

  function handlePuttsChange(event) {
    putts = event.target.value;
  }

  return (
    <>
      <Modal centered show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Choose the options for your game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GameOptions
            handleHolesChange={handleHolesChange}
            getMax={getMax}
            handleBetChange={handleBetChange}
            handleFirstPayoutChange={handleFirstPayoutChange}
            handleSecondPayoutChange={handleSecondPayoutChange}
            handleThirdPayoutChange={handleThirdPayoutChange}
            handleGrossupChange={handleGrossupChange}
            handleEntryChange={handleEntryChange}
            handleEntryPerChange={handleEntryPerChange}
            handleRulesChange={handleRulesChange}
            handlePuttsChange={handlePuttsChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleSetOptions}>
            Set Options
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
