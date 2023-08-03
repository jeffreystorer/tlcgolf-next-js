import { useEffect } from 'react';
import { SaturdayTableHeader, SaturdayTableBody } from '@/components/saturday';
import { set, sset } from '@/components/common/utils';

export default function SaturdayTable() {
  useEffect(() => {
    sset('isLoggedIn', false);
  }, []);

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
