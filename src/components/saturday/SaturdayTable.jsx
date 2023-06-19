import React from 'react';
import { Header } from '@/components/common';
import { SaturdayTableHeader, SaturdayTableBody } from '@/components/saturday';
import { set } from '@/components/common/utils';
import '@/components/saturday/styles/saturday.css';

export default function SaturdayTable({ loggedIn = false }) {
  if (!loggedIn) set('isLoggedIn', 'false');
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
    <>
      {!loggedIn && <Header />}
      <br />
      <h3 className='center'>Saturday Madness Handicaps</h3>
      <br />
      <h5 className='center'>{date}</h5>
      <br />
      <table id='saturday-table' className='background-white'>
        <thead>
          <SaturdayTableHeader />
        </thead>
        <tbody>
          <SaturdayTableBody />
        </tbody>
      </table>
    </>
  );
}
