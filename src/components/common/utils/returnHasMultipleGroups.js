export default function returnHasMultipleGroups(groups) {
  if (groups.slice(-1) === 'Walk') groups.pop();

  let multiple = true;
  if (groups.length === 2) {
    multiple = false;
  }
  return multiple;
}
