import { genderIndex } from '@/components/common/data';
import { buildTeeArray, setRatingSlopePar } from '@/components/common/utils';

export default function rows(
  table,
  rawIndex,
  gender,
  teesSelected,
  teeValues,
  ratings,
  slopes,
  pars
) {
  if (!rawIndex) rawIndex = '0.0';

  //declare some variables
  var rows = [];
  let indexFloat;

  //next, we build an array of tees
  let teesSelectedArray = buildTeeArray(teesSelected);

  //construct the row
  function compute(aTee) {
    let rowReturn = [aTee];
    indexFloat = parseFloat(rawIndex);
    let i; //used by setRatingSlopePar as courseIndex
    for (i = 0; i < 6; i++) {
      //check to make sure the tee is rated for the gender
      let teeIndex = teeValues[genderIndex[gender]][i].indexOf(aTee);
      if (teeIndex === -1) {
        rowReturn.push('-');
      } else {
        const [rating, slope, par] = setRatingSlopePar(
          ratings,
          slopes,
          pars,
          i,
          teeIndex,
          gender
        );
        let ch = doMath(rating, slope, par);
        if (ch < 0) {
          ch = '+' + (0 - ch).toString();
        }
        rowReturn.push(ch);
      }
    }
    return rowReturn;
  }

  //compute course handicap or target score
  function doMath(rating, slope, par) {
    switch (table) {
      case 'CH':
        return Math.round(indexFloat * (slope / 113) + (rating - par));
      default:
        return Math.trunc((indexFloat + 0.04) / (113 / slope) + rating);
    }
  }

  //add a row for each tee
  function addRow(item) {
    rows.push(compute(item));
  }

  teesSelectedArray.forEach(addRow);
  return rows;
}
