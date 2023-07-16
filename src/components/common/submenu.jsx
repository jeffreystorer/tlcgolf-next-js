'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clear, get, set } from '@/components/common/utils';

//TODO: Get modal to close when I click a link
export default function SubMenu(){
  const pathname = usePathname();
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

  function ActiveLink({href, name}){
    const isActive = pathname.startsWith(href);

    return (
      <li key={name}>
        <Link
          className={isActive ? 'active' : 'inactive'}
          href={href}
        >
          {name}
        </Link>
      </li>
    )
  }

  return (
    <div id='submenu'>
      <a href={pathname} className='modalClose' hidden></a>
      <div>
        <a href={pathname} className='modalClose' hidden></a>
          <nav>
            <ul>
              <ActiveLink href='/individual' name='Individual' />
              <ActiveLink href='/groups' name='Groups' />
              {ghinNumber === '585871' && 
              <ActiveLink href='/saturday' name='Saturday' />
              }
              <ActiveLink href='/lookup' name='Lookup GHIN Information' />
              <div className='divider'></div>
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
                <div className='divider'></div>
                </>
              )}              
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
              <div className='divider'></div>
              <ActiveLink href='/tutorials' name='Tutorials' />
              <ActiveLink href='/help' name='Help' />
              <div className='divider'></div>
              <li>
                <Link href='/signout'>Sign Out</Link>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  )
}