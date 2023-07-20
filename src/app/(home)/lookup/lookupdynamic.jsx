'use client';
import dynamic from 'next/dynamic';
const LookUp = dynamic(() => import('@/app/(home)/lookup/lookup'), {
  ssr: false,
});

export function LookupDynamic() {
  return <LookUp />;
}
