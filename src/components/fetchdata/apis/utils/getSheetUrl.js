export default function getSheetUrl(ghinNumber, data) {
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
  const bareUrl = "https://docs.google.com/spreadsheets/d/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg";
  if (propertyIndex > -1) {
    let sheetGid = propertyArray[propertyIndex].properties.sheetId;
    sheetUrl = bareUrl + '/edit#gid=' + sheetGid;
  } else {
    sheetUrl = bareUrl;
  }
    return sheetUrl;
}
