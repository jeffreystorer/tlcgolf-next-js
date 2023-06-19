import React from 'react';
import Button from 'react-bootstrap/Button';
import { get } from '@/components/common/utils';

export default function CopyPlayerListToClipboardButton() {
  const lineup = get('lineup');
  let players = lineup.players;
  players.sort((a, b) =>
    a.lastName > b.lastName
      ? 1
      : a.lastName === b.lastName
      ? a.firstName > b.firstName
        ? 1
        : -1
      : -1
  );

  let playerList = [];
  players.forEach(makeList);

  function makeList(item) {
    playerList.push(item.firstName + ' ' + item.lastName);
  }

  function handleClick(e) {
    e.preventDefault();
    let playerListString = '';
    playerList.map((player, index) => {
      let number = index + 1;
      if (number < 10) {
        number = ' ' + number;
      }
      return (playerListString =
        playerListString + '  ' + number + '.  ' + player + '\n');
    });
    playerListString = 'Players signed up are: \n' + playerListString;
    navigator.clipboard.writeText(playerListString);
  }

  return (
    <>
      <Button variant='custom' size='sm' onClick={handleClick}>
        Copy Players Signed Up to Clipboard
      </Button>
      <br />
    </>
  );
}
