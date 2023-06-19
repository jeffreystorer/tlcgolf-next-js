import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import domtoimage from 'dom-to-image';
import {
  ActiveLineupContainer,
  ButtonsAndImagesContainer,
  ShowCheckboxesContainer,
} from '@/components/export/containers';
import * as state from '@/store';
import { customButtonStyle } from '@/styles';

export default function TableAll() {
  const setScreenShotUrl = useSetRecoilState(state.screenshotUrl);
  const showFirstName = useRecoilValue(state.showFirstName);
  const showTeamHcp = useRecoilValue(state.showTeamHcp);
  const showLocalNumbers = useRecoilValue(state.showLocalNumbers);
  const showIndividualHandicaps = useRecoilValue(state.showIndividualHandicaps);
  const dimensionIndex = useRecoilValue(state.dimensionIndex);
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    if (!refreshed) setRefreshed(true);
  }, [refreshed]);

  useEffect(() => {
    let element = 'lineup-table-div';
    domtoimage
      .toJpeg(document.getElementById(element), { quality: 0.95 })
      .then(function (dataUrl) {
        setScreenShotUrl(dataUrl);
      });
  });

  return (
    <>
      {customButtonStyle}
      <div className='div--center'>
        <ShowCheckboxesContainer />
        <br />
        <ActiveLineupContainer
          showFirstName={showFirstName}
          showTeamHcp={showTeamHcp}
          showLocalNumbers={showLocalNumbers}
          showIndividualHandicaps={showIndividualHandicaps}
        />
        <ButtonsAndImagesContainer dimensionIndex={dimensionIndex} />
      </div>
    </>
  );
}
