import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { TableNext } from '@/components/export';
import * as courseData from '@/components/common/data';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function Table() {
  const router = useRouter();
  const course = get('course');
  const group = get('group');
  const groups = useRecoilValue(state.groups);
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);

  if (
    groups.includes(group) &&
    courseData.courses.includes(course) &&
    currentLineupIndex > -1
  ) {
    return <TableNext />;
  } else {
    router.push('/');
  }
}
