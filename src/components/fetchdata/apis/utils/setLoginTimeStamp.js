import { set } from '@/components/common/utils';

export default function setLoginTimeStamp() {
  const timeStamp = Date.now();
  set('timeStamp', timeStamp);
}
