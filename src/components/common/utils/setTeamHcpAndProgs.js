import { computeAdjTeamProgs } from '@/components/common/utils';

export default function setTeamHcpAndProgs(
  teamName,
  teamMembers,
  progAdj,
  progs069,
  teesSelected
) {
  let aTeamHcp = 0;
  let aTeamProgs = 0;

  if (teamMembers) {
    let playerCount = getPlayerCount(teamMembers);
    try {
      teamMembers.forEach(computeHcpAndProgs);
      aTeamProgs = computeAdjTeamProgs(
        progAdj,
        progs069,
        playerCount,
        aTeamProgs
      );
      let teamProgs = aTeamProgs.toFixed(1);
      aTeamProgs = teamProgs;
    } catch (error) {
      console.log('error setting TeamHcpAndProgs for: ' + teamName);
    }
  }
  return [aTeamHcp, aTeamProgs];

  function getPlayerCount(teamMembers) {
    let playerCount = 0;
    let i;
    for (i = 0; i < teamMembers.length; i++) {
      if (teamMembers[i].courseHandicaps[0] !== 'X') {
        playerCount = playerCount + 1;
      }
    }
    return playerCount;
  }

  function computeHcpAndProgs(item) {
    let teeChoice = item.teeChoice;
    let teesSelectedArray = teesSelected.map((a) => a.value);
    let teeNo = teesSelectedArray.indexOf(teeChoice);
    if (teeNo < 0) teeNo = 0;
    if (item.courseHandicaps[teeNo] !== 'X') {
      let ch = item.courseHandicaps[teeNo];
      if (typeof ch === 'string') ch = ch.replace('+', '-');
      aTeamHcp = aTeamHcp + Number(ch);
      aTeamProgs = aTeamProgs + (36 - Number(ch));
    }
  }
}
