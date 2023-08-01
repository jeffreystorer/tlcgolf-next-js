'use client';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common';
import { sget } from '@/components/common/utils';

export default function Scores({ golfer_id, scores }) {
  const router = useRouter();
  const isLoggedIn = sget('isLoggedIn');
  const scoresData = scores.Scores;

  return (
    <div id='scores'>
      {!isLoggedIn === true && (
        <>
          <h1>TLC Golf</h1>
          <br />
          <br />
        </>
      )}
      <br />
      <table>
        <caption>Revision Scores for GHIN Number {golfer_id}</caption>
        <thead>
          <tr>
            <th scope='col'>Score</th>
            <th scope='col'>Date</th>
            <th scope='col'>C.R./Slope</th>
            <th scope='col'>PCC</th>
            <th scope='col'>Diff.</th>
            <th scope='col'>Course/Tee</th>
          </tr>
        </thead>
        <tbody>
          {scoresData
            .filter((score) => score.revision)
            .map((score, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>
                    {score.used && '* '}
                    {!score.used && '  '}
                    {score.adjusted_gross_score} {score.score_type}
                  </th>
                  <td>{score.played_at}</td>
                  <td>
                    {score.course_rating}/{score.slope_rating}
                  </td>
                  <td>{score.PCC}</td>
                  <td>{score.differential}</td>
                  <td>{score.ghin_course_name_display}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
