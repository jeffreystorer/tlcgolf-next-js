'use client';

export function Temp({ data }) {
  console.log('😊😊 data.canadian', data.canadian);
  let canadianData = [];
  data.canadian.map((item) => canadianData.push(item.members[0]));
  console.log('😊😊 canadianData', canadianData);
  console.log('😊😊 data.foundGolfers', data.foundGolfers);
  let ghinData = [];
  data.foundGolfers.map((item) => ghinData.push(item.golfers[0]));
  console.log('😊😊 foundGolfesrData', foundGolfersData);
  return (
    <>
      <h1>Temp</h1>
    </>
  );
}
