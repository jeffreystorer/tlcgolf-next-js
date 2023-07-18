'use client';
import dynamic from 'next/dynamic';
const EditSchedules = dynamic(
  () => import('@/app/(home)/editschedules/editschedules'),
  {
    ssr: false,
  }
);

export default function Page() {
  return <EditSchedules />;
}
