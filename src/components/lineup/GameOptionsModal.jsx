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
  const [holes, setHoles] = useState('6/6/6');
  const [entry, setEntry] = useState(0);
  const [entryPer, setEntryPer] = useState('/player');
  const [pot, setPot] = useState(0);
  const [potPer, setPotPer] = useState('0.00');
  const [remainder, setRemainder] = useState(0);
  const [remPer, setRemPer] = useState('0.00');
  const [firstPayout, setFirstPayout] = useState(0);
  const [secondPayout, setSecondPayout] = useState(0);
  const [thirdPayout, setThirdPayout] = useState(0);

  const setTextareaValue = useSetRecoilState(state.textareaValue);
  const teamTables = useRecoilValue(state.teamTables)
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const excessPayoutMessage =
    'You are paying out more than the pot.  Please adjust your payouts.';
  const missingHolesMessage = 'Please select the number of holes for each bet.';
  const betsArray = useRecoilValue(state.bets);
  const betsOptionItems = betsArray.map((item) => (
    <option key={uuidv4()} value={item}>
      {item}
    </option>
  ));
  
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

  function handleHolesChange(e) {
    const newHoles = e.target.value;
    setHoles(newHoles);
    setPotPer(computePotPer(newHoles, pot).toFixed(2));
    const newRemainder = computeRemainder(newHoles, pot, firstPayout, secondPayout, thirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(newHoles, newRemainder).toFixed(2))
  }

  function handleEntryPerChange(e) {
    const newEntryPer = e.target.value;
    setEntryPer(newEntryPer);
    const newPot = computePot(entry, newEntryPer);
    setPot(newPot);
    setPotPer(computePotPer(holes, newPot).toFixed(2));
    const newRemainder = computeRemainder(holes, newPot, firstPayout, secondPayout, thirdPayout);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  }

  function handleEntryChange(e) {
    const newEntry = Number(e.target.value);
    console.log(newEntry);
    setEntry(newEntry);
    const newPot = computePot(newEntry, entryPer);
    console.log('newPot: ',newPot);
    setPot(newPot);
    setPotPer(computePotPer(holes, newPot).toFixed(2))
    const newRemainder = computeRemainder(holes, newPot, firstPayout, secondPayout, thirdPayout);
    console.log(holes, newPot, firstPayout, secondPayout, thirdPayout);
    console.log('newRemainder: ',newRemainder);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
    console.log('remPer: ',remPer);
  }

  function handleFirstPayoutChange(e) {
    const newFirstPayout = Number(e.target.value);
    console.log('newFirstPayout: ',newFirstPayout);
    setFirstPayout(newFirstPayout);
    const newRemainder = computeRemainder(holes, pot, newFirstPayout, secondPayout, thirdPayout);
    console.log('newRemainder: ',newRemainder);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  }

  function handleSecondPayoutChange(e) {
    const newSecondPayout = Number(e.target.value);
    console.log('newSecondPayout: ',newSecondPayout);
    setSecondPayout(newSecondPayout);
    const newRemainder = computeRemainder(holes, pot, firstPayout, newSecondPayout, thirdPayout);
    console.log('newRemainder: ',newRemainder);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  }

  function handleThirdPayoutChange(e) {
    const newThirdPayout = Number(e.target.value);
    setThirdPayout(newThirdPayout);
    const newRemainder = computeRemainder(holes, pot, firstPayout, secondPayout, newThirdPayout);
    console.log('newRemainder: ',newRemainder);
    setRemainder(newRemainder);
    setRemPer(computeRemPer(holes, newRemainder).toFixed(2))
  } 

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const bet = formJson.bet;
    const maxValue = formJson.max;
    let max = '';
    if (maxValue) max = 'Net double bogey max.';
    const grossup = formJson.grossup;
    const rules = formJson.rules;
    const putts = formJson.putts;
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
    textareaValue = textareaValue + 'Payout: $' + firstPayout;
    if (secondPayout > 0) textareaValue = textareaValue + '/$' + secondPayout;
    if (thirdPayout > 0) textareaValue = textareaValue + '/$' + thirdPayout;
    if (remainder > 0)
      textareaValue =
        textareaValue + '\nRemaining pot of $' + remainder + ' for skins';
    if (rules !== '') textareaValue = textareaValue + '\n' + rules;
    if (putts !== '') textareaValue = textareaValue + '\n' + putts;
    setTextareaValue((prev) => textareaValue);
    window.location.href = '#';
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
  

  function computePotPer(
    holes,
    pot
  ) {
    switch (holes) {
      case '6/6/6':
        return pot/3;
      case '9&9':
        return pot/2;
      case '18':
        return pot;
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
            <select name='holes' onChange={handleHolesChange}>
              <option value=''>Select Number of Holes for Each Bet</option>
              {holesOptionItems}
            </select>
            <select name='bet'>
              <option value=''>Select Bet</option>
              {betsOptionItems}
            </select>
            <label>
              <input type='checkbox' name='max' />
              Net double bogey max.?
            </label>
            <select name='grossup'>
              <option value=''>Gross Up?</option>
              {grossupOptionItems}
            </select>
            <select name='entryPer' onChange={handleEntryPerChange}>
              <option value='/player'>Entry per player or team?</option>
              {entryPerOptionItems}
            </select>
            <article>
              <label>
                Entry:&nbsp;&nbsp;
                <input type='number' name='entry' min='1' max='100' onChange={handleEntryChange} />
              </label>         
              {entry > 0 &&
              <div >
                <p>Pot (per bet): {pot}&nbsp;({potPer})</p>
                <p>Remainder (per bet): {remainder}&nbsp;({remPer})</p>
              </div>
              }
              </article> 
              <article>
                <label>
                  <br />
                  Payouts:
                </label>
                <label>
                  1st:
                  <br />
                  <input type='number' name='firstPayout' min='1' max='100' onChange={handleFirstPayoutChange} />
                </label>
                <label>
                  2nd:
                  <br />
                  <input type='number' name='secondPayout' min='1' max='100' onChange={handleSecondPayoutChange} />
                </label>
                <label>
                  3rd:
                  <br />
                  <input type='number' name='thirdPayout' min='1' max='100' onChange={handleThirdPayoutChange} />
                </label>
              </article>
            <select name='rules'>
              <option value=''>Winter or Summer Rules?</option>
              {rulesOptionItems}
            </select>
            <select name='putts'>
              <option value=''>Putts Good?</option>
              {puttsOptionItems}
            </select>
            <footer>
              <a type='button' className='not-stacked modalClose' href='#'>
                Cancel
              </a>
              <button className='not-stacked' type='submit'>
                Set Options
              </button>
            </footer>
          </fieldset>
        </form>
      </section>
    </div>
  );  
}
