'use client';
import dynamic from 'next/dynamic';
const Lineup = dynamic(() => import('@/app/(home)/lineup/lineup'), {
  ssr: false,
});

export default function Page() {
  return <Lineup />;
}
