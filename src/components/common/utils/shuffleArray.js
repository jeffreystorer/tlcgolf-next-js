export default function shuffleArray(array) {
  array.sort(() => 0.5 - Math.random());
  return array;
}
