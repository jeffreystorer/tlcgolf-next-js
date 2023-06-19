export default function createProgAdjMessage(progAdj, progs069) {
  switch (Number(progAdj)) {
    case 0:
      return "No threesome/foursome prog adj"
    case 3:
      switch (Number(progs069)) {
        case 6:
          return "Threesome Progs include +1 per 6"
        case 9:
          return "Threesome Progs include +1.5 per 9"
        case 18:
          return "Threesome Progs include +3 per 18"
        default:
          return null
      }
    case 4:
      switch (Number(progs069)) {
        case 6:
          return "Foursome Progs include -1 per 6"
        case 9:
          return "Foursome Progs include -1.5 per 9"
        case 18:
          return "Foursome Progs include -3 per 18"
        default:
          return null
      }
    default:
  }
}
