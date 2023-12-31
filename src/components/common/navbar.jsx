'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();

  const links = [
    {
      href: '/lineup',
      name: 'Lineup',
    },
    {
      href: '/export',
      name: 'Export',
    },
  ];

  return (
    <div id='hero'>
      <h1>TLC Golf</h1>
      <nav>
        <ul>
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);

            return (
              <li key={link.name}>
                <Link
                  className={isActive ? 'active' : 'inactive'}
                  href={link.href}>
                  {link.name}
                </Link>
              </li>
            );
          })}
          <li>
            <a href='#submenu'>More . . .</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
