'use client';
import dynamic from 'next/dynamic';
const EditBets = dynamic(() => import('@/app/(home)/editbets/editbets'), {
  ssr: false,
});

export default function Page() {
  return <EditBets />;
}
