'use client';
import { useState } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  entryPerOptionItems,
  grossupOptionItems,
  holesOptionItems,
  puttsOptionItems,
  rulesOptionItems,
} from '@/components/lineup/optionitems';
import * as state from '@/store';

//TODO: Fix failure to remember bet

export default function GameOptionsModal() {
  const betsArray = useRecoilValue(state.bets);
  const betsOptionItems = betsArray.map((item) => (
    <option key={uuidv4()} value={item}>
      {item}
    </option>
  ));
  const [holes, setHoles] = useState('');
  const [bet, setBet] = useState('');
  const [maxValue, setMaxValue] = useState(false);
  const [grossup, setGrossup] = useState('');
  const [entry, setEntry] = useState('');
  const [entryPer, setEntryPer] = useState('/player');
  const [pot, setPot] = useState(0);
  const [remainder, setRemainder] = useState(0);
  const [remPer, setRemPer] = useState('0.00');
  const [firstPayout, setFirstPayout] = useState('');
  const [secondPayout, setSecondPayout] = useState('');
  const [thirdPayout, setThirdPayout] = useState('');
  const [rules, setRules] = useState('');
  const [putts, setPutts] = useState('');

  const setTextareaValue = useSetRecoilState(state.textareaValue);
  const teamTables = useRecoilValue(state.teamTables)
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const excessPayoutMessage =
    'You are paying out more than the pot.  Please adjust your payouts.';
  const missingHolesMessage = 'Please select the number of holes for each bet.';
  
  const playerCount = () => {
    let teamCount = Object.keys(teamTables).length - 1;
    let playerCount = 0;
    for (let i = 0; i < teamCount; i++) {
      let teamName = 'team' + i;
      playerCount = playerCount + getTeamPlayerCount(teamTables[teamName]);
    }
    return playerCount;
  };

  function getTeamPlayerCount(teamMembers) {
    let teamPlayerCount = 0;
    let i;
    for (i = 0; i < teamMembers.length; i++) {
      if (teamMembers[i].courseHandicaps[0] !== "X") {
        teamPlayerCount = teamPlayerCount + 1;
      }
    }
    return teamPlayerCount;
  }

  function handleBetChange(e) {
    setBet(e.target.value);
  }

  function handleHolesChange(e) {
    const newHoles = e.target.value;
    setHoles(newHoles);
    const newRemainder = computeRemainder(newHoles, pot, firstPayout, secondPayout, thirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(newHoles, newRemainder).toFixed(2))
  }

  function handleMaxValueChange(e) {
    setMaxValue(e.target.checked);
  }

  function handleGrossupChange(e) {
    setGrossup(e.target.value);
  }

  function handleEntryPerChange(e) {
    setEntryPer(e.target.value);
  }

  function handleEntryChange(e) {
    const newEntry = Number(e.target.value);
    setEntry(newEntry);
    const newPot = computePot(newEntry, entryPer);
    setPot(newPot);
    const newRemainder = computeRemainder(holes, newPot, firstPayout, secondPayout, thirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  }

  function handleFirstPayoutChange(e) {
    const newFirstPayout = Number(e.target.value);
    setFirstPayout(newFirstPayout);
    const newRemainder = computeRemainder(holes, pot, newFirstPayout, secondPayout, thirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  }

  function handleSecondPayoutChange(e) {
    const newSecondPayout = Number(e.target.value);
    setSecondPayout(newSecondPayout);
    const newRemainder = computeRemainder(holes, pot, firstPayout, newSecondPayout, thirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  }

  function handleThirdPayoutChange(e) {
    const newThirdPayout = Number(e.target.value);
    setThirdPayout(newThirdPayout);
    const newRemainder = computeRemainder(holes, pot, firstPayout, secondPayout, newThirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  } 

  function handleRulesChange(e) {
  setRules(e.target.value);
  }

  function handlePuttsChange(e) {
  setPutts(e.target.value);
  }

  function computePot(entry, entryPer) {
    switch (entryPer) {
      case '/player':
      case '':
        return playerCount() * entry;
        break;
      case '/team':
        return teeTimeCount * entry;
        break;
      default:
        break;
    }
  }  

  function computeRemainder(
    holes,
    pot,
    firstPayout,
    secondPayout,
    thirdPayout
  ) {
    let payoutTotal = firstPayout + secondPayout + thirdPayout;
    switch (holes) {
      case '6/6/6':
        return pot - payoutTotal * 3;
      case '9&9':
        return pot - payoutTotal * 2;
      case '18':
        return pot - payoutTotal;
      default:
        break;
    }
  }

  function computeRemPer(
    holes,
    remainder
  ) {
    switch (holes) {
      case '6/6/6':
        return remainder / 3;
      case '9&9':
        return  remainder / 2;
      case '18':
        return remainder;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let max = '';
    if (maxValue) max = 'Net double bogey max.';
    if (holes !== '6/6/6' && holes !== '9&9' && holes !== '18') {
      alert(missingHolesMessage);
      return;
    }
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
      pot;
    if (thirdPayout > 0) textareaValue = textareaValue + '\n';
    textareaValue = textareaValue + '\nPayout: $' + firstPayout;
    if (secondPayout > 0) textareaValue = textareaValue + '/$' + secondPayout;
    if (thirdPayout > 0) textareaValue = textareaValue + '/$' + thirdPayout;
    if (remainder > 0)
      textareaValue =
        textareaValue + '\n$' + remainder + ' for _________';
    if (rules !== '') textareaValue = textareaValue + '\n' + rules;
    if (putts !== '') textareaValue = textareaValue + '\n' + putts;
    setTextareaValue((prev) => textareaValue);
    window.location.href = '#';
  }

  return (
    <div id='gameoptionsmodal' className='modal'>
      <a href='#' className='modalClose' hidden></a>
      <section>
        <header>
          <h2>Choose the options for your game</h2>
          <a href='#' className='modalClose' hidden></a>
        </header>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <select name='holes' onChange={handleHolesChange} value={holes}>
              <option value=''>Select Number of Holes for Each Bet</option>
              {holesOptionItems}
            </select>
            <select name='bet' onChange={handleBetChange} value={bet}>
              <option value=''>Select Bet</option>
              {betsOptionItems}
            </select>
            <label>
              <input type='checkbox' name='max' onChange={handleMaxValueChange} checked={maxValue}/>
              Net double bogey max.?
            </label>
            <select name='grossup' onChange={handleGrossupChange} value={grossup}>
              <option value=''>Gross Up?</option>
              {grossupOptionItems}
            </select>
            <select name='entryPer' onChange={handleEntryPerChange} value={entryPer}>
              <option value='/player'>Entry per player or team?</option>  
              {entryPerOptionItems}
            </select>
            <p>Entry:</p>
            <article>
              <label>
                <input type='number' name='entry' min='1' max='100' onChange={handleEntryChange} value={entry} />
              </label>          
              {entry > 0 &&
                <p>Pot: {pot}</p>
              }
              </article>
              <p>Payouts and Remainder (per bet):</p>
              <article>
                <label>
                  1st:
                  <br />
                  <input type='number' name='firstPayout' min='0' max='100' onChange={handleFirstPayoutChange} value={firstPayout} />
                </label>
                <label>
                  2nd:
                  <br />
                  <input type='number' name='secondPayout' min='0' max='100' onChange={handleSecondPayoutChange} value={secondPayout} />
                </label>
                <label>
                  3rd:
                  <br />
                  <input type='number' name='thirdPayout' min='0' max='100' onChange={handleThirdPayoutChange} value={thirdPayout} />
                </label>       
              {entry > 0 &&
                <label>
                  <br />
                  {remainder}&nbsp;({remPer})
                  </label>
              }
              </article> 
            <select name='rules'   onChange={handleRulesChange}>
              <option value=''>Winter or Summer Rules?</option>
              {rulesOptionItems}
            </select>
            <select name='putts' onChange={handlePuttsChange}>
              <option value=''>Putts Good?</option>
              {puttsOptionItems}
            </select>
            <footer>
              <button 
                type='button' 
                className='not-stacked modalClose' 
                onClick={() => window.location.href = '#'}
              >
                Cancel
              </button>
              <button 
                type='submit' 
                className='not-stacked modalConfirm' 
              >
                Set Options
              </button>
            </footer>
          </fieldset>
        </form>
      </section>
    </div>
  );  
}
