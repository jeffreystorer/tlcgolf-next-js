import {
  get,
  aFirstName,
  aLastName,
  anIndex,
  aGender,
  capitalize,
} from '@/components/common/utils';

export default function getIndividualGHIN(dataMode) {
  const ghinNumber = get('ghinNumber');
  if (dataMode === 'ghin') {
    const data = get('foundGolfer');
    try {
      let index = data.handicap_index;
      let gender = data.gender;
      let firstName = data.first_name;
      let rawName = firstName.toLowerCase();
      firstName = capitalize(rawName);
      if (firstName.indexOf('.') > 0) firstName = firstName.toUpperCase();
      let golfer =
        firstName + ' ' + data.last_name + ' (' + data.handicap_index + ')';
      return [index, gender, golfer];
    } catch (error) {}
  } else {
    let roster = get('roster');
    try {
      let index = anIndex(roster, ghinNumber);
      let gender = aGender(roster, ghinNumber);
      let firstName = aFirstName(roster, ghinNumber);
      let lastName = aLastName(roster, ghinNumber);
      let rawName = firstName.toLowerCase();
      firstName = capitalize(rawName);
      if (firstName.indexOf('.') > 0) firstName = firstName.toUpperCase();
      let golfer =
        firstName + ' ' + lastName + ' (' + anIndex(roster, ghinNumber) + ')';
      return [index, gender, golfer];
    } catch (error) {}
  }
}
