'use client';
//TODO Styling
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { clear, get, set } from '@/components/common/utils';

export function NavBar() {
    const router = useRouter();
  const ghinNumber = get('ghinNumber');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');

  function signOut(e) {
    e.preventDefault();
    //values to be preserved
    const ghinNumber = get('ghinNumber');
    const lastName = get('lastName');
    const course = get('course');
    const group = get('group');
    const teesSelected = get('teesSelected');
    clear();
    set('ghinNumber', ghinNumber);
    set('lastName', lastName);
    set('course', course);
    set('group', group);
    set('teesSelected', teesSelected);
    router.push('/');
  }

  return (
    <>
      <h1 id='brand'>
        TLC Golf
      </h1>
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
                  <button type='button' className='button not_stacked' onClick={signOut}>Sign Out</button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
    </>
  );
}
