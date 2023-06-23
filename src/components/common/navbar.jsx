'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export function NavBar() {
  const hasSchedule = useRecoilValue(state.hasSchedule);
  const schedules = useRecoilValue(state.schedules);
  const ghinNumber = get('ghinNumber');

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
            <Link href='/export'>Export</Link>
          </li>
          <li>
            <details>
              <summary>More...</summary>
              <ul>
                <li>
                  <Link href='/groups'>Export</Link>
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
                  <Link href='/tutorials'>Tutorials</Link>
                </li>
                <li>
                  <Link href='/help'>Help</Link>
                </li>
                <div className='divider full'></div>
                <li>
                  <Link href='/home/signout'>Sign Out</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </>
  );
}
