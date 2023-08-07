'use client';
import dynamic from 'next/dynamic';
const ExportDynamic = dynamic(
  () => import('@/app/(home)/export/exportdynamic'),
  {
    ssr: false,
  }
);

export default function Page() {
  return <ExportDynamic />;
}
