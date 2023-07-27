import React from 'react';
import { SavedLineups } from '@/components/lineup';

export default function SavedLineupsBox({ snapshots }) {
  return (
    <div id='saved-lineups' className='titled_outer'>
      <h2>Saved Lineups</h2>
      <SavedLineups snapshots={snapshots} />
    </div>
  );
}
