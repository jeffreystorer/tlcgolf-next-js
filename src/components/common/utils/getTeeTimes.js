import { linkTimes } from '@/components/lineup/optionitems';

export default function getTeeTimes(aLinkTime, aTeeTimeCount) {
  let times = []; //["", "", "", "", "", "", "", "", "", ""]
  //if (aTeeTimeCount > 0 && aLinkTime !== "Set Link Time Above") {
  const firstRegularTimeIndex = linkTimes().indexOf('8:02');
  const linkTimeIndex = linkTimes().indexOf(aLinkTime);
  if (linkTimeIndex < firstRegularTimeIndex) {
    for (let i = 0; i < aTeeTimeCount; i++) {
      times[i] = aLinkTime;
    }
  } else {
    for (let i = 0; i < aTeeTimeCount; i++) {
      times[i] = linkTimes()[linkTimeIndex + i];
    }
  }
  //}
  return times;
}
