'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const LookUpPage = dynamic(() => import('@/components/lookup/LookupPage'), {
  ssr: false,
});

export function LookupDynamic() {
  useSetAllRecoilState();
  return <LookUpPage />;
}
