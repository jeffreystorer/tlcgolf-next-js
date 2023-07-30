'use client';
import { useSetRecoilState } from 'recoil';
import { CancelChangeTeesButton } from '@/components/lineup/buttons';
import { courses } from '@/components/common/data';
import {
  useUpdatePlayersInLineup,
  useUpdateTeamTables,
} from '@/components/lineup/hooks';
import { useChangeTeesOptionItems } from '@/components/lineup/optionitems/hooks';
import { get, buildTeeArray, set } from '@/components/common/utils';
import * as state from '@/store';

//TODO: Do I need to distinguish between teesSelected (all) and (course)
export default function ChangeTees() {
  const changeTeesOptionItems = useChangeTeesOptionItems();
  const course = get('course');
  let teesSelected = get('teesSelected');
  const courseIndex = courses.indexOf(course);
  const updateTeamTables = useUpdateTeamTables();
  const updatePlayersInLineup = useUpdatePlayersInLineup();
  const setShowChangeTees = useSetRecoilState(state.showChangeTees);
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
    teesSelected[course] = tees;
    set('teesSelected', teesSelected);
    setShowChangeTees(false);
    updatePlayersInLineup(teesSelected[course]);
    updateTeamTables(teesSelected[course]);
  }

  return (
    <div id='change-tees' className='titled_inner'>
      <h3>Change Tees</h3>
      <form onSubmit={handleSubmit}>
        <select
          defaultValue={defaultValue}
          id='teeSelector'
          name='tees'
          multiple={true}
          size={13}>
          {changeTeesOptionItems(courseIndex)}
        </select>
        <div className='buttons'>
          <button className='not-stacked' type='submit'>
            Change
          </button>
          <CancelChangeTeesButton />
        </div>
      </form>
    </div>
  );
}
