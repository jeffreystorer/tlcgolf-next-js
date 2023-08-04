'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const ScoresPage = dynamic(() => import('@/components/scores/ScoresPage'), {
  ssr: false,
});

export function ScoresDynamic({ golfer_id, scores }) {
  useSetAllRecoilState();
  return <ScoresPage golfer_id={golfer_id} scores={scores} />;
}
