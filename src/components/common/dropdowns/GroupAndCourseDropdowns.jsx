'use client';
import { useRecoilValue } from 'recoil';
import { CourseDropdown, GroupDropdown } from '@/components/common';
import { get } from '@/components/common/utils';
import { returnHasMultipleGroups } from '@/components/common/utils';
import * as state from '@/store';

export default function GroupAndCourseDropdowns() {
  const groups = useRecoilValue(state.groups);
  const hasMultipleGroups = returnHasMultipleGroups(groups);

  return (
    <div className='select-dropdown-container'>
      {hasMultipleGroups && <GroupDropdown />}
      <CourseDropdown hasMultipleGroups={hasMultipleGroups} />
    </div>
  );
}
