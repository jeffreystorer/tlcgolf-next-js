import React from 'react';
import { SavedLineups } from '@/components/lineup';
import { TitledBox } from '@/components/common';

export default function SavedLineupsBox({ snapshots }) {
  return (
    <>
      <TitledBox title={'Saved Lineups'}>
        <SavedLineups snapshots={snapshots} />
      </TitledBox>
    </>
  );
}
