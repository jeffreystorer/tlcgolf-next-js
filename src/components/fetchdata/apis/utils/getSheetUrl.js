'use client';
import { SHEET_ID } from '@/components/fetchdata/apis/constants';
import { get, set } from '@/components/common/utils';

export default function getSheetUrl(data) {
  const ghinNumber = get('ghinNumber');
  let propertyArray;
  let propertyIndex;
  let sheetUrl;
  try {
    propertyArray = data.sheets;
    propertyIndex = propertyArray.findIndex(
      (x) => x.properties.title === ghinNumber
    );
  } catch (err) {
    console.log(err);
  }
  const bareUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}`;
  debugger;
  if (propertyIndex > -1) {
    let sheetGid = propertyArray[propertyIndex].properties.sheetId;
    sheetUrl = bareUrl + '/edit#gid=' + sheetGid;
    return sheetUrl;
  } else {
    sheetUrl = bareUrl;
    return sheetUrl;
  }
}
