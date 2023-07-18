'use client';
import { RecoilRoot } from 'recoil';
import { NavBar } from '@/components/common/navbar';
import dynamic from 'next/dynamic';
const SubMenu = dynamic(() => import('@/components/common/submenu'), {
  ssr: false,
});
import '@/app/globals.css';

export default function HomeLayout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <RecoilRoot>{children}</RecoilRoot>
      </main>
      <SubMenu />
    </>
  );
}
