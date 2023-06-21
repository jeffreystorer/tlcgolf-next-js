export default function computeAdjTeamProgs(
  progAdj,
  progs069,
  playerCount,
  aTeamProgs
) {
  let adjTeamProgs = aTeamProgs;
  switch (Number(progAdj)) {
    case 0:
      switch (Number(progs069)) {
        case 6:
          adjTeamProgs = adjTeamProgs / 3;
          break;
        case 9:
          adjTeamProgs = adjTeamProgs / 2;
          break;
        case 18:
          break;
        default:
          adjTeamProgs = 0;
      }
      break;
    case 3:
      switch (Number(progs069)) {
        case 6:
          if (playerCount === 3) {
            adjTeamProgs = adjTeamProgs / 3 + 1;
          } else {
            adjTeamProgs = adjTeamProgs / 3;
          }
          break;
        case 9:
          if (playerCount === 3) {
            adjTeamProgs = adjTeamProgs / 2 + 1.5;
          } else {
            adjTeamProgs = adjTeamProgs / 2;
          }
          break;
        case 18:
          if (playerCount === 3) {
            adjTeamProgs = adjTeamProgs + 3;
          }
          break;
        default:
          adjTeamProgs = 0;
      }
      break;
    case 4:
      switch (Number(progs069)) {
        case 6:
          if (playerCount === 4) {
            adjTeamProgs = adjTeamProgs / 3 - 1;
          } else {
            adjTeamProgs = adjTeamProgs / 3;
          }
          break;
        case 9:
          if (playerCount === 4) {
            adjTeamProgs = adjTeamProgs / 2 - 1.5;
          } else {
            adjTeamProgs = adjTeamProgs / 2;
          }
          break;
        case 18:
          if (playerCount === 4) {
            adjTeamProgs = adjTeamProgs - 3;
          }
          break;
        default:
          adjTeamProgs = 0;
      }
      break;
    default:
  }
  return adjTeamProgs;
}
