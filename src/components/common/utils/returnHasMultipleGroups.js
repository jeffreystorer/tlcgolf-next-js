import { get } from '@/components/common/utils';

export default function returnHasMultipleGroups() {
  const groups = get('groups');

  if (groups.slice(-1) === 'Walk') groups.pop();

  let multiple = true;
  if (groups.length === 2) {
    multiple = false;
  }
  return multiple;
}
