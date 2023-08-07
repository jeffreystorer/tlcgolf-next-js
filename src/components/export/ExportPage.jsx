'use client';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import * as courseData from '@/components/common/data';
import { get, sget } from '@/components/common/utils';
import { LoadLineup } from '@/components/export';
import * as state from '@/store';

export default function ExportPage() {
  const router = useRouter();
  const isLoggedIn = sget('isLoggedIn');
  const course = get('course');
  const group = get('group');
  const groups = useRecoilValue(state.groups);
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);
  if (
    groups.includes(group) &&
    courseData.courses.includes(course) &&
    currentLineupIndex > -1
  ) {
    return <LoadLineup />;
  } else {
    router.push('/lineup');
  }
}
