'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const LineupPage = dynamic(() => import('@/components/lineup/LineupPage'), {
  ssr: false,
});
import * as state from '@/store';

export default function SetState() {
  const setAllRecoilState = useSetAllRecoilState();
  setAllRecoilState();
  return <LineupPage />;
}
