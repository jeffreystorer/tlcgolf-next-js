'use client';
import { useSetAllRecoilState } from '@/components/common/hooks';
import dynamic from 'next/dynamic';
const GroupsPage = dynamic(() => import('@/components/groups/GroupsPage'), {
  ssr: false,
});
import * as state from '@/store';

export default function SetState() {
  useSetAllRecoilState();
  return <GroupsPage />;
}
