export default function getCaptains(values) {
  let captains = [];
  let captainsArray = values;
  captainsArray.shift();
  captainsArray.forEach(createCaptainsObject);

  function createCaptainsObject(item) {
    let captainsObject = { ghinNumber: item[0], lastName: item[1] };
    captains.push(captainsObject);
  }

  return captains;
}
