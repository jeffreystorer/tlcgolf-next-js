'use client';
import { useRecoilValue } from 'recoil';
import { courses } from '@/components/common/data';
import { useCreateTeeArrays } from '@/components/common/hooks';
import { createTeeLabels } from '@/components/lineup/optionitems/utils';
import * as state from '@/store';
import { v4 as uuidv4 } from 'uuid';

export default function useChangeTeesOptionItems() {
  const courseData = useRecoilValue(state.courseData);
  const createTeeArrays = useCreateTeeArrays();

  function createChangeTeesOptionItems() {
    let teeArrays = createTeeArrays();
    let teeLabels = createTeeLabels(courseData);
    let allTeeOptionItems = [];
    let teeOptionItems = [];
    courses.forEach(processAllCoursesTeeArrays);
    function processAllCoursesTeeArrays(item) {
      //item is the array for each course with value, label object for each tee
      const course = item;
      const courseIndex = courses.indexOf(course);

      //courseTeeArray is the course's array of value, label objects
      //it needs to be mutable
      const courseTeeArray = teeArrays[courseIndex];
      teeOptionItems = JSON.parse(JSON.stringify(courseTeeArray));
      const courseTeeLabels = teeLabels[courseIndex];
      const mCourseTeeLabels = courseTeeLabels[0];
      const wCourseTeeLabels = courseTeeLabels[1];
      courseTeeArray.forEach(addGenderLabels);
      function addGenderLabels(item, index) {
        //item is a value, label object for a tee
        //item = courseTeeArray[index]
        const teeObject = item;
        //index is the index of the object in the teeArray
        const teeObjectIndex = index;

        /*
          see if the label in a combinedCourseTeeArray object
          is found in the women's tee and if not, add (M Only)
          to the label
        */
        if (!wCourseTeeLabels.includes(teeObject.label)) {
          teeOptionItems[teeObjectIndex].limit = '(Men only)';
        }
        if (!mCourseTeeLabels.includes(teeObject.label)) {
          teeOptionItems[teeObjectIndex].limit = '(Women only)';
        }
      }
      allTeeOptionItems.push(teeOptionItems);
    }
    return allTeeOptionItems;
  }

  function changeTeesOptionItems(courseIndex) {
    let optionItems = createChangeTeesOptionItems();
    return optionItems[courseIndex].map((teeItem) => (
      <option key={uuidv4()} value={teeItem.value}>
        {teeItem.label} {teeItem?.limit}
      </option>
    ));
  }

  return changeTeesOptionItems;
}
