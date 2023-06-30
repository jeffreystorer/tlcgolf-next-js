import { cache } from 'react';

export const fetchData = cache(() =>
  fetch('https://cataas.com/api/cats', {
    method: 'GET',
  }).then((res) => res.json())
);
