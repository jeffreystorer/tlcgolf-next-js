'use client';
import { courses } from '@/components/common/data';
import { useCreateTeeArrays } from '@/components/common/hooks';

export default function useGetTeeLabelFromTeeValue() {
  const createTeeArrays = useCreateTeeArrays();

  function getTeeLabelFromTeeValue(teeValue, course) {
    const courseIndex = courses.indexOf(course);
    const teeArrays = createTeeArrays();
    const courseTeeArray = teeArrays[courseIndex];
    let teeObj = courseTeeArray.find((obj) => obj.value === teeValue);
    let teeLabel = teeObj.label;
    return teeLabel;
  }
  return getTeeLabelFromTeeValue;
}
