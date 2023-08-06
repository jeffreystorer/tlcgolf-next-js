import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import domtoimage from 'dom-to-image';
import {
  ActiveLineupContainer,
  ButtonsAndImagesContainer,
  ShowCheckboxesContainer,
} from '@/components/export/containers';
import * as state from '@/store';

export default function Table() {
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
    let element = 'lineup-image';
    domtoimage
      .toJpeg(document.getElementById(element), { quality: 0.95 })
      .then(function (dataUrl) {
        setScreenShotUrl(dataUrl);
      });
  });

  return (
    <div id='export'>
      <div>
        <ButtonsAndImagesContainer dimensionIndex={dimensionIndex} />
        <ShowCheckboxesContainer />
      </div>
      <div>
        <ActiveLineupContainer
          showFirstName={showFirstName}
          showTeamHcp={showTeamHcp}
          showLocalNumbers={showLocalNumbers}
          showIndividualHandicaps={showIndividualHandicaps}
        />
      </div>
    </div>
  );
}
