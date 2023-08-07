'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const GroupsPage = dynamic(() => import('@/components/groups/GroupsPage'), {
  ssr: false,
});

export default function Page() {
  useSetAllRecoilState();
  return <GroupsPage />;
}
