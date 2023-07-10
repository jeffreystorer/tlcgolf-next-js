'use client';
//TODO Styling
import Link from 'next/link';

export function NavBar() {

  return (
    <div id='hero'>
      <h1>
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
        <a href='#menu_not-phone'>More . . .</a>       
        </li>
      </ul>
      </nav>
    </div>
  );
}
