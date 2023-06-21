import { RecoilRootWrapper } from '@/wrappers/recoilroutewrapper';
//import { NavBar } from '@/components/common/navbar';
import './globals.css';

export const metadata = {
  title: 'TLC Golf',
  description:
    'App to create lineups for golf groups at The Landings Golf and Athletic Club',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {/* <header>
          <NavBar />
        </header> */}
        <main>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </main>
      </body>
    </html>
  );
}
