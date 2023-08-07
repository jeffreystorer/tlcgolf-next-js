'use client';
import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import { clear, get, set } from '@/components/common/utils';
import * as state from '@/store';

export default function SubMenu() {
  const pathname = usePathname();
  const ghinNumber = get('ghinNumber');
  const hasSchedule = useRecoilValue(state.hasSchedule);
  const schedules = useRecoilValue(state.schedules);

  function ActiveLink({ href, name }) {
    const isActive = pathname.startsWith(href);

    return (
      <li key={name}>
        <a className={isActive ? 'active' : 'inactive'} href={href}>
          {name}
        </a>
      </li>
    );
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
            {ghinNumber === '585871' && (
              <ActiveLink href='/saturday' name='Saturday' />
            )}
            <ActiveLink href='/lookup' name='Lookup GHIN Information' />
            <div className='divider'></div>
            {hasSchedule && (
              <>
                {schedules.map((schedule) => {
                  return (
                    <li key={schedule.name}>
                      <a href={schedule.url}>{schedule.name} Schedule</a>
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
              <a href='/editbets'>Edit Bets</a>
            </li>
            <li>
              <a href='/editschedules'>Add or Delete a Schedule</a>
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
  );
}
