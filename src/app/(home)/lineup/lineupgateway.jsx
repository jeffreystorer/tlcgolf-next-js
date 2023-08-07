'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const LineupPage = dynamic(() => import('@/components/lineup/LineupPage'), {
  ssr: false,
});

export default function LineupGateway() {
  useSetAllRecoilState();
  return <LineupPage />;
}