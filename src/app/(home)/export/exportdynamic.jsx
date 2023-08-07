'use client';
import dynamic from 'next/dynamic';
const ExportPage = dynamic(() => import('@/components/export/ExportPage'), {
  ssr: false,
});

export default function ExportDynamic() {
  return <ExportPage />;
}
