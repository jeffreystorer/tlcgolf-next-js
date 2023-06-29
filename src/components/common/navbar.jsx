'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { get } from '@/components/common/utils';

export function NavBar() {
  const ghinNumber = get('ghinNumber');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');

  return (
    <>
      <Link id='brand' href='/home/signout'>
        TLC Golf
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/home/lineup'>Lineup</Link>
          </li>
          <li>
            <Link href='/home/export'>Export</Link>
          </li>
          <li>
            <details>
              <summary>More...</summary>
              <ul>
                <li>
                  <Link href='/groups'>Groups</Link>
                </li>
                <li>
                  <Link href='/individual'>Individual</Link>
                </li>
                {ghinNumber === '585871' && (
                  <li>
                    <Link href='/saturday'>Saturday</Link>
                  </li>
                )}
                <li>
                  <Link href='/lookup'>Lookup GHIN Information</Link>
                </li>
                <div className='divider full'></div>
                {hasSchedule &&
                  schedules.map((schedule) => {
                    let path = '/' + schedule.name.toLowerCase() + '-schedule';
                    return (
                      <li key={'route/' + schedule.id + '/' + schedule.name}>
                        <Link href={path}>{schedule.name} Schedule</Link>
                      </li>
                    );
                  })}
                <div className='divider full'></div>
                <li>
                  <Link href='/edittable'>Edit Table</Link>
                </li>
                <li>
                  <Link href='https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/edit#gid=270710306'>
                    Edit Bets
                  </Link>
                </li>
                <li>
                  <Link href='https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/edit#gid=1579243035'>
                    Add or Delete a Schedule
                  </Link>
                </li>
                <li>
                  <Link href='/home/tutorials'>Tutorials</Link>
                </li>
                <li>
                  <Link href='/home/help'>Help</Link>
                </li>
                <div className='divider full'></div>
                <li>
                  <Link href='/signout'>Sign Out</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </>
  );
}
