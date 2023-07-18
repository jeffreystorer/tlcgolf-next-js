'use client';
import dynamic from 'next/dynamic';
const Tutorials = dynamic(() => import('@/app/(home)/tutorials/tutorials'), {
  ssr: false,
});

export function TutorialsDynamic({ tutorialList }) {
  return <Tutorials tutorialList={tutorialList} />;
}
