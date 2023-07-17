'use client';
import { usePathname } from 'next/navigation';
import { clear, get, set } from '@/components/common/utils';

export default function SubMenu(){
  const pathname = usePathname();
  const ghinNumber = get('ghinNumber');
  const hasSchedule = get('hasSchedule');
  const schedules = get('schedules');

  function ActiveLink({href, name}){
    const isActive = pathname.startsWith(href);

    return (
      <li key={name}>
        <a
          className={isActive ? 'active' : 'inactive'}
          href={href}
        >
          {name}
        </a>
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
                      <a href={path}>{schedule.name} Schedule</a>
                    </li>
                  );
                })}
                <div className='divider'></div>
                </>
              )}              
              <li>
                <a href='/edittable'>Edit Table</a>
              </li>
              <li>
                <a href='https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/edit#gid=270710306'>
                  Edit Bets
                </a>
              </li>
              <li>
                <a href='https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/edit#gid=1579243035'>
                  Add or Delete a Schedule
                </a>
              </li>      
              <div className='divider'></div>
              <ActiveLink href='/tutorials' name='Tutorials' />
              <ActiveLink href='/help' name='Help' />
              <div className='divider'></div>
              <li>
                <a href='/signout'>Sign Out</a>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  )
}