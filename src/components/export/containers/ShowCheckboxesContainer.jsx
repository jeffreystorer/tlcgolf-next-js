import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  ShowFirstNameCheckbox,
  ShowIndividualHandicapsCheckbox,
  ShowLocalNumbersCheckbox,
  ShowTeamHcpCheckbox,
} from '@/components/export/checkboxes';
import * as state from '@/store';
import { get } from '@/components/common/utils';

export default function ShowCheckboxesContainer() {
  const showIndividualHandicaps = useRecoilValue(state.showIndividualHandicaps);
  const lineup = get('lineup');
  const progs069 = lineup.progs069;

  return (
    <>
      <ShowFirstNameCheckbox />
      <br />
      {progs069 < 1 && showIndividualHandicaps && <ShowTeamHcpCheckbox />}
      <ShowIndividualHandicapsCheckbox />
      <br />
      <ShowLocalNumbersCheckbox />
    </>
  );
}
