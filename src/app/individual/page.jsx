import React from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useVisibilityChange } from 'use-visibility-change';
import {
  IndividualTableHeader,
  CHTableBody,
  TSTableBody,
} from '@/components/individual';
import { FetchData } from '@/components/fetchdata';
import { ScoresTable } from '@/components/scores';
import { get, loginStale, set } from '@/components/common/utils';
import { returnAllTeesSelected } from '@/pages/utils';
import { getIndividualGHIN } from '@/components/individual/utils';

export default function IndividualPage() {
  const navigate = useNavigate();
  const dataMode = get('dataMode');
  set('golfer_id', get('ghinNumber'));
  const [index, gender, golfer] = getIndividualGHIN(dataMode);
  // eslint-disable-next-line
  const [teeLabels, teeValues, ratings, slopes, pars] = get('courseData');
  const teesSelected = get('teesSelected');

  const onShow = () => {
    window.location.reload();
  };
  useVisibilityChange({ onShow });

  function onClick() {
    navigate('/scores');
  }

  let allTeesSelected = returnAllTeesSelected(teesSelected);

  if (loginStale()) return <FetchData />;

  return (
    <>
      <br />
      <div className='golfer--center'>
        <h4>{golfer}</h4>
        <h6 className='golfer_id link--revision-scores' onClick={onClick}>
          Click Here for Revision Scores
        </h6>
      </div>
      <br />
      <div>
        <Table striped size='lg' className='w-25'>
          <thead>
            <IndividualTableHeader tableName='CrsHcp' />
          </thead>
          <tbody>
            <CHTableBody
              index={index}
              gender={gender}
              teesSelected={allTeesSelected}
              teeValues={teeValues}
              ratings={ratings}
              slopes={slopes}
              pars={pars}
            />
          </tbody>
        </Table>
        <br />
        <Table striped size='lg' className='w-25'>
          <thead>
            <IndividualTableHeader tableName='Score*' />
          </thead>
          <tbody>
            <TSTableBody
              index={index}
              gender={gender}
              teesSelected={allTeesSelected}
              teeValues={teeValues}
              ratings={ratings}
              slopes={slopes}
              pars={pars}
            />
          </tbody>
        </Table>
        <br></br>
        <p className='paragraph--center'>
          *Score you must average eight out of your<br></br>last twenty rounds
          to maintain your index.
        </p>
      </div>
    </>
  );
}
