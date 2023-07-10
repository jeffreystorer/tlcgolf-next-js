'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { clear, get, set } from '@/components/common/utils';



function UnorderedList() {
  const ghinNumber = get('ghinNumber');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');
  const router = useRouter();

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
    <ul id='more'>
      <li>
        <Link href='/home/groups'>Groups</Link>
      </li>
      <li>
        <Link href='/home/individual'>Individual</Link>
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
      {hasSchedule && (
        <>
        {schedules.map((schedule) => {
          let path = '/' + schedule.name.toLowerCase() + '-schedule';
          return (
            <li key={'route/' + schedule.id + '/' + schedule.name}>
              <Link href={path}>{schedule.name} Schedule</Link>
            </li>
          );
        })}
        <div className='divider full'></div>
        </>
      )
      }
      
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
  );
}

export function MenuNotPhone(){
    return (
        <nav id='menu_not-phone'>
          <a href='#' className='modalClose' hidden></a>
          <div>
            <a href='#' className='modalClose' hidden></a>
            <UnorderedList />
          </div>
        </nav>

    )

}