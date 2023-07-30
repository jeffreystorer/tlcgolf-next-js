import {
  get,
  aFirstName,
  aLastName,
  anIndex,
  aGender,
  capitalize,
} from '@/components/common/utils';

export default function getIndividualGHIN(foundGolfer, roster) {
  const ghinNumber = get('ghinNumber');
  const dataMode = get('dataMode');
  if (dataMode === 'ghin') {
    try {
      let index = foundGolfer.handicap_index;
      let gender = foundGolfer.gender;
      let firstName = foundGolfer.first_name;
      let rawName = firstName.toLowerCase();
      firstName = capitalize(rawName);
      if (firstName.indexOf('.') > 0) firstName = firstName.toUpperCase();
      let golfer =
        firstName +
        ' ' +
        foundGolfer.last_name +
        ' (' +
        foundGolfer.handicap_index +
        ')';
      return [index, gender, golfer];
    } catch (error) {}
  } else {
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
