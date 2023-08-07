export default function getGender(id, allPlayersInTable) {
  const player = allPlayersInTable.find(({ 0: n }) => n === id);
  const gender = player[5];
  return gender;
}
