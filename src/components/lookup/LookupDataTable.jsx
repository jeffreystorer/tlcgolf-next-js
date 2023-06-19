import React from 'react';
import { useNavigate } from 'react-router-dom';
import { get, set } from '@/components/common/utils';
import '@/components/lookup/styles/lookup.css';

export default function LookupDataTable() {
  const navigate = useNavigate();
  let searchedName = get('last_name');
  if (get('first_name')) searchedName = searchedName + ', ' + get('first_name');
  const golfers = get('golfers').golfers;
  function generateRows() {
    let oddRow = false;
    for (var i = 0; i < golfers.length; i++) {
      oddRow = !oddRow;
      rowsTD[i] = (
        <tr key={i} className={`${oddRow ? '' : 'tr--shaded'}`}>
          <td className='saturday-left-row-cell'>{rows[i][0]}</td>
          {generateCols(i, oddRow)}
        </tr>
      );
    }
    return rowsTD;
  }

  function onClick(e) {
    let golfer_id = e.target.innerText;
    set('golfer_id', golfer_id);
    navigator.clipboard.writeText(golfer_id);
    navigate('/scores');
  }

  return (
    <>
      <br />
      <h3 className='center'>GHIN Information for {searchedName}</h3>
      <h6 className='center golfer_id link--revision-scores'>
        Click On GHIN Number below for Revision Scores
      </h6>
      <br />
      <table id='lookup-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Index</th>
            <th>GHIN Number</th>
            <th>Club</th>
            <th>Primary Club State</th>
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
              const evenRow = Math.abs(index % 2) == 0;
              return (
                <tr key={index} className={`${evenRow ? '' : 'tr--shaded'}`}>
                  <td>{golfer.first_name}</td>
                  <td>{golfer.handicap_index}</td>
                  <td className='golfer_id' onClick={onClick}>
                    {golfer.ghin}
                  </td>
                  <td>{golfer.club_name}</td>
                  <td>{golfer.primary_club_state}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
