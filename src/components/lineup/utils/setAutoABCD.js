import { ABCD, ABC } from '@/components/common/data';

export default function setAutoABCD(teeTimes, playerCount) {
  let autoABCD = [];

  switch (teeTimes) {
    case 2:
      switch (playerCount) {
        case 6:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 8:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 3:
      switch (playerCount) {
        case 9:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 12:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 4:
      switch (playerCount) {
        case 12:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 16:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 5:
      switch (playerCount) {
        case 15:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 20:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 6:
      switch (playerCount) {
        case 18:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 24:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 7:
      switch (playerCount) {
        case 21:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 28:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 8:
      switch (playerCount) {
        case 24:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 32:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 9:
      switch (playerCount) {
        case 27:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 36:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    case 10:
      switch (playerCount) {
        case 30:
          autoABCD = ABC[playerCount / 3 - 2];
          break;
        case 40:
          autoABCD = ABCD[playerCount / 4 - 2];
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return autoABCD;
}
