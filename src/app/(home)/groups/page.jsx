'use client';
import dynamic from 'next/dynamic';
const SetState = dynamic(() => import('@/app/(home)/groups/setState'), {
  ssr: false,
});

export default function Page() {
  return <SetState />;
}
