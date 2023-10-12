'use client';
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
  const setTextareaValue = useSetRecoilState(state.textareaValue);
  const teeTimeCount = useRecoilValue(state.teeTimeCount);
  const playerCount = useRecoilValue(state.playerCount);
  const excessPayoutMessage =
    'You are paying out more than the pot.  Please adjust your payouts.';
  const missingHolesMessage = 'Please select the number of holes for each bet.';
  const betsArray = useRecoilValue(state.bets);
  const betsOptionItems = betsArray.map((item) => (
    <option key={uuidv4()} value={item}>
      {item}
    </option>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const holes = formJson.holes;
    const bet = formJson.bet;
    const maxValue = formJson.max;
    let max = '';
    if (maxValue) max = 'Net double bogey max.';
    const grossup = formJson.grossup;
    const entryPer = formJson.entryPer;
    const entry = Number(formJson.entry);
    const firstPayout = Number(formJson.firstPayout);
    const secondPayout = Number(formJson.secondPayout);
    const thirdPayout = Number(formJson.thirdPayout);
    const rules = formJson.rules;
    const putts = formJson.putts;
    if (holes !== '6/6/6' && holes !== '9&9' && holes !== '18') {
      alert(missingHolesMessage);
      return;
    }
    const pot = computePot(entry, entryPer);
    const remainder = computeRemainder(
      holes,
      pot,
      firstPayout,
      secondPayout,
      thirdPayout
    );
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
      '\n';
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
        return playerCount * entry;
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
    console.log('😊😊 payoutTotal', payoutTotal);
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
            <select name='holes'>
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
            <select name='entryPer'>
              <option value='/player'>Entry per player or team?</option>
              {entryPerOptionItems}
            </select>
            <article>
              <label>
                Entry:
                <br />
                <input type='number' name='entry' min='1' max='100' />
              </label>
              <label>
                <br />
                Payouts:
              </label>
              <label>
                First:
                <br />
                <input type='number' name='firstPayout' min='1' max='100' />
              </label>
              <label>
                Second:
                <br />
                <input type='number' name='secondPayout' min='1' max='100' />
              </label>
              <label>
                Third:
                <br />
                <input type='number' name='thirdPayout' min='1' max='100' />
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
