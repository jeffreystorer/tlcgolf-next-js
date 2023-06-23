import { get } from '@/components/common/utils';

export default function getGender(id) {
  const allPlayers = get('allPlayersInTable');
  const player = allPlayers.find(({ 0: n }) => n === id);
  const gender = player[5];
  return gender;
}
