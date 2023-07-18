'use client';
import dynamic from 'next/dynamic';
const Saturday = dynamic(() => import('@/app/(home)/saturday/saturday'), {
  ssr: false,
});

export default function Page() {
  return <Saturday />;
}
