import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const dimensionArray = [
  ['Row(s)', 'Columns'], //0
  [1, 2], //1
  [1, 3], //2
  [1, 4], //3
  [2, 2], //4
  [2, 3], //5
  [2, 4], //6
  [3, 2], //7
  [3, 3], //8
  [3, 4], //9
  [4, 2], //10
  [4, 3], //11
  [4, 4], //12
];

export const dimensionsOptionItems = dimensionArray.map((dimension, index) => (
  <option key={uuidv4()} value={index}>
    {dimension[0] + ' X ' + dimension[1]}
  </option>
));
