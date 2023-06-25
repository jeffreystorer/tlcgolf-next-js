import { aGender } from "@/components/common/utils";

export default function getGenderFromRoster(roster, ghinNumber, lastName) {
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
