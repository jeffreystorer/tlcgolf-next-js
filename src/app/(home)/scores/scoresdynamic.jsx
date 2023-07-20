'use client';
import dynamic from 'next/dynamic';
const Scores = dynamic(() => import('@/app/(home)/scores/scores'), {
  ssr: false,
});

export function ScoresDynamic({ golfer_id, scores }) {
  return <Scores golfer_id={golfer_id} scores={scores} />;
}
