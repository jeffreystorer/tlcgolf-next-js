'use client';
//import { RecoilRootWrapper } from '@/wrappers/recoilroutewrapper';
import { NavBar } from '@/components/common/navbar';
import { SubMenu } from '@/components/common/submenu';
import { get } from '@/components/common/utils'
import '@/app/globals.css';

export const metadata = {
  title: 'TLC Golf',
  description:
    'App to create lineups for golf groups at The Landings Golf and Athletic Club',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* <RecoilRootWrapper> */}
        <body>    
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
          <SubMenu />
          </body>
      {/* </RecoilRootWrapper> */}
    </html>
  );
}
