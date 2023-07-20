'use client';
import dynamic from 'next/dynamic';
const Saturday = dynamic(
  () => import('@/app/(notloggedin)/saturday/saturday'),
  {
    ssr: false,
  }
);

export default function Page() {
  return <Saturday />;
}
