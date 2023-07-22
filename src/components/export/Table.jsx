import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { TableNext } from '@/components/export';
import * as courseData from '@/components/common/data';
import { get } from '@/components/common/utils';
import * as state from '@/store';

export default function Table() {
  const router = useRouter();
  const course = useRecoilValue(state.course);
  const group = useRecoilValue(state.group);
  const currentLineupIndex = useRecoilValue(state.currentLineupIndex);
  const groups = get('groups');

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
