'use client';
import dynamic from 'next/dynamic';
const Individual = dynamic(() => import('@/app/(home)/individual/individual'), {
  ssr: false,
});

export default function Page() {
  return <Individual />;
}
