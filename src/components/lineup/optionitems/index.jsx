'use client';
import { v4 as uuidv4 } from 'uuid';
import { createTeeOptionItems } from '@/components/lineup/optionitems/utils';

//date and time Dropdowns option items

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.',
];
const playingDates = () => {
  let playingDates = [];
  const today = new Date();
  for (let i = 0; i < 8; i++) {
    let dayName = days[today.getDay()];
    let monthName = months[today.getMonth()];
    let playingDate = dayName + ', ' + monthName + ' ' + today.getDate();
    playingDates[i] = playingDate;
    today.setDate(today.getDate() + 1);
  }
  return playingDates;
};

export const playingDateOptionItems = playingDates().map((playingDate) => (
  <option key={uuidv4()}>{playingDate}</option>
));
const teeTimeCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const teeTimeCountOptionItems = teeTimeCounts.map((count) => (
  <option key={uuidv4()} value={count}>
    {count === 1 ? count + ' tee time' : count + ' tee times'}
  </option>
));

const teeAssignments = [
  '1',
  '1A',
  '1B',
  '2',
  '2A',
  '2B',
  '3',
  '3A',
  '3B',
  '4',
  '4A',
  '4B',
  '5',
  '5A',
  '5B',
  '6',
  '6A',
  '6B',
  '7',
  '7A',
  '7B',
  '8',
  '8A',
  '8B',
  '9',
  '9A',
  '9B',
  '10',
  '10A',
  '10B',
  '11',
  '11A',
  '11B',
  '12',
  '12A',
  '12B',
  '13',
  '13A',
  '13B',
  '14',
  '14A',
  '14B',
  '15',
  '15A',
  '15B',
  '16',
  '16A',
  '16B',
  '17',
  '17A',
  '17B',
  '18',
  '18A',
  '18B',
];

export const linkTimes = () => {
  let linkTimes = [];
  linkTimes.push(
    'Shotgun',
    '8:30 Shotgun',
    '8:45 Shotgun',
    '9:00 Shotgun',
    '9:30 Shotgun',
    '10:00 Shotgun',
    '10:30 Shotgun',
    '11:00 Shotgun',
    '11:30 Shotgun',
    '12:00 Shotgun',
    '12:30 Shotgun',
    '1:00 Shotgun',
    '1:30 Shotgun'
  );
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let firstLinkTime = new Date(year, month, date, 7, 46, 0, 0);
  let hour = firstLinkTime.getHours();
  let minute = firstLinkTime.getMinutes();

  function setLinkTime() {
    let aLinkTime;
    if (minute < 10) {
      aLinkTime = hour + ':0' + minute;
    } else {
      aLinkTime = hour + ':' + minute;
    }
    return aLinkTime;
  }

  linkTimes.push(setLinkTime());
  for (let i = 1; i < 72; i++) {
    firstLinkTime.setMinutes(firstLinkTime.getMinutes() + 8);
    hour = firstLinkTime.getHours();
    minute = firstLinkTime.getMinutes();
    linkTimes.push(setLinkTime());
  }
  return linkTimes;
};
export const linkTimeOptionItems = linkTimes().map((linkTime) => (
  <option key={uuidv4()} value={linkTime}>
    {linkTime}
  </option>
));

export const teeAssignmentOptionItems = teeAssignments.map((teeAssignment) => (
  <option key={uuidv4()} value={teeAssignment}>
    {teeAssignment}
  </option>
));

function manualCHList() {
  let manualCHList = [];
  manualCHList.push({ value: '*', text: '*' });
  manualCHList.push({ value: 'Auto', text: 'Auto' });
  manualCHList.push({ value: '-', text: 'Not in Game' });
  for (let i = -10; i < 0; i++) {
    let ch = '+' + Math.abs(i);
    manualCHList.push({ value: ch, text: ch });
  }
  for (let i = 0; i < 61; i++) manualCHList.push({ value: i, text: i });
  return manualCHList;
}

export const manualCHOptionItems = manualCHList().map((manualCH) => (
  <option key={uuidv4()} value={manualCH.value}>
    {manualCH.text}
  </option>
));

const holesArray = ['6/6/6', '9&9', '18'];

export const holesOptionItems = holesArray.map((item) => (
  <option key={uuidv4()} value={item}>
    {item}
  </option>
));

const grossupArray = ['Threesome(s)=4/3', 'Foursome(s)=3/4'];

export const grossupOptionItems = grossupArray.map((item) => (
  <option key={uuidv4()} value={item}>
    {item}
  </option>
));

const entryPerArray = ['player', 'team'];

export const entryPerOptionItems = entryPerArray.map((item) => (
  <option key={uuidv4()} value={'/' + item}>
    per {item}
  </option>
));

const rulesArray = ['Winter Rules', 'Summer Rules', 'LCP through the green'];

export const rulesOptionItems = rulesArray.map((item) => (
  <option key={uuidv4()} value={item}>
    {item}
  </option>
));

const puttsArray = [
  { nickName: 'Hole All', fullName: 'PLEASE HOLE ALL PUTTS THAT COUNT' },
  {
    nickName: 'Good within a Shoe Length',
    fullName: 'PUTTS GOOD WITHIN A SHOE LENGTH',
  },
];

export const puttsOptionItems = puttsArray.map((item) => (
  <option key={uuidv4()} value={item.fullName}>
    {item.fullName}
  </option>
));
