'use client';
import dynamic from 'next/dynamic';
const Help = dynamic(() => import('@/app/(home)/help/help'), {
  ssr: false,
});

export default function Page() {
  return <Help />;
}
