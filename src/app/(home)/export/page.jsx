'use client';
import dynamic from 'next/dynamic';
const Export = dynamic(() => import('@/app/(home)/export/export'), {
  ssr: false,
});

export default function Page() {
  return <Export />;
}
