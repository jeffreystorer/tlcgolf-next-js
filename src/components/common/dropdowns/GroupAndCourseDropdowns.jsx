import React from 'react';
import { CourseDropdown, GroupDropdown } from '@/components/common';
import { get } from '@/components/common/utils';
import { returnHasMultipleGroups } from '@/components/groups/utils';

export default function GroupAndCourseDropdowns() {
  const groups = get('groups');
  const hasMultipleGroups = returnHasMultipleGroups();

  return (
    <div className='select-dropdown-container'>
      {hasMultipleGroups && <GroupDropdown />}
      <CourseDropdown groups={groups} hasMultipleGroups={hasMultipleGroups} />
    </div>
  );
}
