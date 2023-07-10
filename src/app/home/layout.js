'use client';
//import { RecoilRootWrapper } from '@/wrappers/recoilroutewrapper';
import { NavBar } from '@/components/common/navbar';
import { MenuNotPhone } from '@/components/common/menunotphone';
import '@/app/globals.css';

export default function Layout({ children }) {
  return (
    <>
    {/* <RecoilRootWrapper> */}
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <MenuNotPhone />
    {/* </RecoilRootWrapper> */}  
   </>
  );

}
