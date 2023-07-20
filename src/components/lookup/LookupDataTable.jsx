'use client';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';

export default function LookupDataTable({ last_name, first_name, golfers }) {
  const router = useRouter();
  let searchedName = last_name;
  if (first_name) searchedName = searchedName + ', ' + first_name;

  function onClick(e) {
    let golfer_id = e.target.innerText;
    navigator.clipboard.writeText(golfer_id);
    router.push(`/scores?golfer_id=${golfer_id}`);
  }

  return (
    <div id='lookup'>
      <br />
      <h2>GHIN Information for {searchedName}</h2>
      <br />
      <table>
        <caption>Click On GHIN Number below for Revision Scores</caption>
        <thead>
          <tr>
            <th scope='col'>First Name</th>
            <th scope='col'>Index</th>
            <th scope='col'>GHIN Number</th>
            <th scope='col'>Club</th>
            <th scope='col'>Primary Club State</th>
          </tr>
        </thead>
        <tbody>
          {golfers
            .sort((a, b) => {
              return a.first_name.toUpperCase() > b.first_name.toUpperCase()
                ? 1
                : -1;
            })
            .map((golfer, index) => {
              const path = `/scores?golfer_id=${golfer.ghin}`;
              return (
                <tr key={index}>
                  <th scope='row'>{golfer.first_name}</th>
                  <td>{golfer.handicap_index}</td>
                  <td>
                    <a href={path}>{golfer.ghin}</a>
                  </td>
                  <td>{golfer.club_name}</td>
                  <td>{golfer.primary_club_state}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
