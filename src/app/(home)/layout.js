import { NavBar } from '@/components/common/navbar';
import dynamic from 'next/dynamic';
const SubMenu = dynamic(() => import('@/components/common/submenu'), {
  ssr: false,
});

export default function HomeLayout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <SubMenu />
    </>
  );
}
