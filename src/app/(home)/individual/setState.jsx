'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const IndividualPage = dynamic(
  () => import('@/components/individual/IndividualPage'),
  {
    ssr: false,
  }
);
import * as state from '@/store';

export default function SetState() {
  useSetAllRecoilState();
  return <IndividualPage />;
}
