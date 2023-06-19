import { aGender, aLastName, get, set } from '@/components/common/utils';
import {
  setDefaultTeesSelected,
  setLoginTimeStamp,
} from '@/components/fetchdata/apis/utils';

export default function setFoundGolferAndIsLoggedIn(afoundGolfer) {
  const lastName = get('lastName');
  const dataMode = get('dataMode');

  if (dataMode === 'ghin') {
    set('foundGolfer', afoundGolfer);
    const foundGolfer = get('foundGolfer');
    set('isLoggedIn', 'false');
    let myLastName;
    try {
      myLastName = foundGolfer.last_name;
    } catch (error) {
      localStorage.clear();
      set('ghinNumber', 'Invalid GHIN Number');
    }
    if (lastName === myLastName) {
      setDefaultTeesSelected(foundGolfer.gender);
      set('isLoggedIn', 'true');
      setLoginTimeStamp();
    } else {
      if (get('ghinNumber') !== 'Invalid GHIN Number') {
        set('lastName', 'Invalid Last Name');
      }
    }
  } else {
    const ghinNumber = get('ghinNumber');
    set('isLoggedIn', 'false');
    const roster = get('roster');
    let myLastName;
    try {
      myLastName = aLastName(roster, ghinNumber);
    } catch (error) {
      localStorage.clear();
      set('ghinNumber', 'Not in Roster');
    }
    if (lastName === myLastName) {
      let gender = aGender(roster, ghinNumber);
      try {
        setDefaultTeesSelected(gender);
      } catch (error) {
        console.log('error setting default tees: ' + error);
      }
      set('isLoggedIn', 'true');
      setLoginTimeStamp();
    } else {
      if (get('ghinNumber') !== 'Not in Roster')
        set('lastName', 'Invalid Last Name');
    }
  }
}
