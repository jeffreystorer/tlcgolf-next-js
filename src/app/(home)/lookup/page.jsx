'use client';
import dynamic from 'next/dynamic';
const LookUp = dynamic(() => import('@/app/(home)/lookup/lookup'), {
  ssr: false,
});

export default function Page() {
  return <LookUp />;
}
