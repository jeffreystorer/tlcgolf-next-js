import React from 'react';
export default function TitledBox(props) {
  return (
    <div className='titled-box'>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
}
