import { get, set } from '@/components/common/utils';

const loginStale = () => {
  if (!get('timeStamp')) set('timeStamp', 1);
  const today = Date.now();
  const todayDate = new Date(today);
  const todayObj = dateObj(todayDate);
  const loginDay = get('timeStamp');
  const loginDate = new Date(loginDay);
  const loginObj = dateObj(loginDate);
  return todayObj.getTime() > loginObj.getTime();
};

function dateObj(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default loginStale;
