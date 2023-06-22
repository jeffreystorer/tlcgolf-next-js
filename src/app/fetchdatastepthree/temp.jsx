'use client';

export function Temp({ data }) {
  console.log('😊😊 data.canadian[0]', data.canadian[0]);
  let canadianData = [];
  data.canadian[0].map((golfer) =>
    canadianData.push(JSON.parse(golfer.value).members[0])
  );
  console.log('😊😊 canadianData', canadianData);
  return (
    <>
      <h1>Temp</h1>
    </>
  );
}
