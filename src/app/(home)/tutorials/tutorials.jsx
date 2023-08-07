'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ScrollToTop from 'react-scroll-to-top';
import { sget } from '@/components/common/utils';

export default function Tutorials({ tutorialList }) {
  const router = useRouter();
  const isLoggedIn = sget('isLoggedIn');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);

  function handleClick(e) {
    e.preventDefault();
    const details = document.getElementById('details');
    details.removeAttribute('open');
    const href = e.target.hash;
    const id = href.slice(1);
    const link = document.getElementById(id);
    link.scrollIntoView();
  }

  return (
    <div id='tutorials'>
      <h2>Tutorials</h2>
      <details id='details'>
        <summary>Table of Contents</summary>
        <ul>
          <li>
            <a onClick={handleClick} href='#0'>
              Creating and Sending Out a Lineup
            </a>
          </li>
          <li>
            <a onClick={handleClick} href='#1'>
              Automatically Assigning Players to Teams
            </a>
          </li>
          <li>
            <a onClick={handleClick} href='#2'>
              Adding a Guest
            </a>
          </li>
        </ul>
      </details>
      {tutorialList}
      <ScrollToTop smooth />
    </div>
  );
}
