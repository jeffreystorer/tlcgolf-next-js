'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const IndividualPage = dynamic(
  () => import('@/components/individual/IndividualPage'),
  {
    ssr: false,
  }
);

export default function Page() {
  useSetAllRecoilState();
  return <IndividualPage />;
}
