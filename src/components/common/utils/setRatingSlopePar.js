export default function setRatingSlopePar(
  ratings,
  slopes,
  pars,
  courseIndex,
  teeIndex,
  gender
) {
  let rating, slope, par;
  switch (gender) {
    case 'F':
      rating = Number(ratings[1][courseIndex][teeIndex]);
      slope = Number(slopes[1][courseIndex][teeIndex]);
      par = Number(pars[1][courseIndex][teeIndex]);
      break;
    default:
      rating = Number(ratings[0][courseIndex][teeIndex]);
      slope = Number(slopes[0][courseIndex][teeIndex]);
      par = Number(pars[0][courseIndex][teeIndex]);
  }

  return [rating, slope, par];
}
