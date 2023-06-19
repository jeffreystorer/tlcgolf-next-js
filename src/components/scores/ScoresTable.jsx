import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Loading } from '@/components/fetchdata';
import { Header } from '@/components/common';
import { get } from '@/components/common/utils';
import { useGetScores } from '@/components/scores/hooks';
import '@/components/scores/styles/scores.css';

export default function ScoresTable() {
  const navigate = useNavigate();
  const isLoggedIn = get('isLoggedIn');
  const golfer_id = get('golfer_id');
  const from_date_played = get('from_date_played');
  const [loading] = useGetScores(golfer_id, from_date_played);

  if (loading) return <Loading />;
  const scores = get('scores').Scores;
  console.log('😊😊 scores', scores);
  function generateRows() {
    let oddRow = false;
    for (var i = 0; i < scores.length; i++) {
      oddRow = !oddRow;
      rowsTD[i] = (
        <tr key={i} className={`${oddRow ? '' : 'tr--shaded'}`}>
          <td>{rows[i][0]}</td>
          {generateCols(i, oddRow)}
        </tr>
      );
    }
    return rowsTD;
  }

  function onClick() {
    navigate(-1);
  }

  return (
    <>
      <Container className='center'>
        <Row
          className='center row'
          xs='auto'
          sm='auto'
          md='auto'
          lg='auto'
          xl='auto'
          xxl='auto'>
          <Col xs='auto' sm='auto' md='auto' lg='auto' xl='auto' xxl='auto'>
            {isLoggedIn === 'false' && (
              <>
                <Header />
              </>
            )}
            <br />
            <button className='button not_stacked' onClick={onClick}>
              Back to Previous Page
            </button>
            <br />
            <br />
            <h3 className='center'>
              Revision Scores for GHIN Number {golfer_id}
            </h3>
            <br />
            <Table
              responsive
              id='scores-table'
              size='sm'
              className='w-100 center'>
              <thead>
                <tr>
                  <th className='score'>Score</th>
                  <th className='playing_date'>Date</th>
                  <th className='rating_slope'>C.R./Slope</th>
                  <th className='PCC'>PCC</th>
                  <th className='diff'>Diff.</th>
                  <th className='course_tee'>Course/Tee</th>
                </tr>
              </thead>
              <tbody>
                {scores
                  .filter((score) => score.revision)
                  .map((score, index) => {
                    const evenRow = Math.abs(index % 2) == 0;
                    return (
                      <tr
                        key={index}
                        className={`${evenRow ? '' : 'tr--shaded'}`}>
                        <td className='score'>
                          {score.used && '* '}
                          {!score.used && '  '}
                          {score.adjusted_gross_score} {score.score_type}
                        </td>
                        <td className='playing_date'>{score.played_at}</td>
                        <td className='rating_slope'>
                          {score.course_rating}/{score.slope_rating}
                        </td>
                        <td className='diff'>{score.PCC}</td>
                        <td>{score.differential}</td>
                        <td className='course_tee'>
                          {score.ghin_course_name_display}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
