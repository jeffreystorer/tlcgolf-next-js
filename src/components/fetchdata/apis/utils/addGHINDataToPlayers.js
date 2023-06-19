import { aLocalNumber, capitalize, get, set } from '@/components/common/utils';

export default function addGHINDataToPlayers(data) {
  //data[x] will be null if player doesn't have a GHIN number
  let roster = get('roster');
  let players = get('allPlayersInTable');
  let canadianData = get('canadianData');
  let canadianIndex = 0;

  players.forEach(addData);

  function addData(item, index) {
    if (data[index]) {
      let firstName = data[index].first_name;
      let rawName = firstName.toLowerCase();
      firstName = capitalize(rawName);
      if (firstName.indexOf('.') > 0) firstName = firstName.toUpperCase();
      item[3] = firstName;
      item[4] = data[index].handicap_index;
      item[5] = data[index].gender;
      try {
        const ghinNumber = data[index].ghin;
        item[6] = aLocalNumber(roster, ghinNumber);
      } catch (error) {
        item[6] = '00000';
      }
    } else {
      //set the default
      item[3] = '';
      item[4] = 'no index';
      item[6] = '00000';
      //now see if we have a parenthetical after the player's name
      const parenIndex = item[1].indexOf('(');
      //if we have a parenthetical, is it (M5.2) or (CM4725547)
      //where 4725547 is the card no. from http://gcapp.golfnet.com/community/golfers/search
      let parenType; //this will be either M, W, or C
      if (parenIndex > -1) {
        const paren = item[1].substr(parenIndex);
        parenType = paren.substr(1, 1);
        switch (parenType) {
          case 'M':
          case 'W':
            //set the gender
            item[5] = parenType;
            const lastPart = paren.substring(2);
            const hcpIndex = lastPart.replace(')', '');
            item[4] = hcpIndex.toString();
            //strip the parenthetical from the name
            const newItem1 = item[1].substring(0, parenIndex - 1);
            item[1] = newItem1;
            break;
          case 'C':
            //set the gender
            item[5] = paren.substr(2, 1);
            item[1] = capitalize(
              canadianData[canadianIndex].lastName.toLowerCase()
            );
            item[3] = capitalize(
              canadianData[canadianIndex].firstName.toLowerCase()
            );
            item[4] = canadianData[canadianIndex].hcpIndex;
            canadianIndex++;
            break;
          default:
            break;
        }
      }
    }
  }

  set('allPlayersInTable', players);
}
