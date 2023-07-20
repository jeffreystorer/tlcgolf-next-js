import { useEffect } from 'react';
import { SaturdayTableHeader, SaturdayTableBody } from '@/components/saturday';
import { set } from '@/components/common/utils';

export default function SaturdayTable() {
  useEffect(() => {
    set('isLoggedIn', false);
  }, []);

  const defaultValue = {
    dc: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    mg: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    mw: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    or: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    pa: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
    tp: [
      { label: 'Club', value: 'C' },
      { label: 'Club/Medal', value: 'C/M' },
      { label: 'Medal', value: 'M' },
    ],
  };
  set('teesSelectedSaturday', defaultValue);

  let today = new Date();
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
  let dayName = days[today.getDay()];
  let monthName = months[today.getMonth()];
  let date = dayName + ', ' + monthName + ' ' + today.getDate();
  return (
    <div id='saturday'>
      <h2>Saturday Madness Handicaps</h2>
      <br />
      <h3></h3>
      <table>
        <caption>
          Click on a Player for Revision Scores
          <br />
          {date}
        </caption>
        <thead>
          <SaturdayTableHeader />
        </thead>
        <tbody>
          <SaturdayTableBody />
        </tbody>
      </table>
    </div>
  );
}
