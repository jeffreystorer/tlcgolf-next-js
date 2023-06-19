import { get, set } from '@/components/common/utils';

export default function LogoutPage() {
  //values to be preserved
  const ghinNumber = get('ghinNumber');
  const lastName = get('lastName');
  const course = get('course');
  const group = get('group');
  localStorage.clear();
  set('ghinNumber', ghinNumber);
  set('lastName', lastName);
  set('course', course);
  set('group', group);
  document.location = '/';
  return null;
}
