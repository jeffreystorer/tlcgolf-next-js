import React from 'react';
import { useSetRecoilState } from 'recoil';
import { CancelSelectTeesButton } from '@/components/lineup/buttons';
import { courses } from '@/components/common/data';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '@/components/lineup/hooks';
import { get, buildTeeArray, set } from '@/components/common/utils';
import { selectTeesOptionItems } from '@/components/lineup/optionitems';
import * as state from '@/store';

const SelectTees = () => {
  const course = get('course');
  let teesSelected = get('teesSelected');
  const courseIndex = courses.indexOf(course);
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const setTeesSelected = useSetRecoilState(state.teesSelected);
  const setShowSelectTees = useSetRecoilState(state.showSelectTees);
  const defaultValue = buildTeeArray(teesSelected[course]);
  let tees = [];

  function handleSubmit(e) {
    e.preventDefault();
    var sel = document.getElementById('teeSelector');
    var alloptions = sel.options;
    var options = [];
    for (var i = 0, len = alloptions.length; i < len; i++) {
      if (alloptions[i].selected) {
        options = [...options, alloptions[i]];
      }
    }
    Array.from(options).forEach(function (element) {
      const mText = element.text.replace(' (Men only)', '');
      const text = mText.replace(' (Women only)', '');
      tees.push({ label: text, value: element.value });
    });
    teesSelected = { ...teesSelected, [course]: tees };
    set('teesSelected', teesSelected);
    setTeesSelected(teesSelected);
    setShowSelectTees(false);
    updatePlayersInLineup(course, teesSelected[course]);
    updateTeamTables(course, teesSelected[course]);
  }

  return (
    <div className='div--bordered'>
      <div className='div--center'>
        <form onSubmit={handleSubmit}>
          <label>
            <select
              defaultValue={defaultValue}
              id='teeSelector'
              name='tees'
              multiple={true}
              size={13}>
              {selectTeesOptionItems(courseIndex)}
            </select>
          </label>
          <br />
          <br />
          <input className='button' type='submit' value={'Change'} />
          <CancelSelectTeesButton />
        </form>
      </div>
    </div>
  );
};

export default SelectTees;
