'use client';
import '@/app/globals.css';

export const metadata = {
  title: 'TLC Golf',
  description:
    'App to create lineups for golf groups at The Landings Golf and Athletic Club',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
        <body>
          {children}
        </body>
    </html>
  );
}
