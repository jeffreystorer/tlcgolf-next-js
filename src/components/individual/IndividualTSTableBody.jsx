import { returnBodyRows } from '@/components/individual/utils';

const TSTableBody = (props) => {
  const rows = returnBodyRows(
    'TS',
    props.index,
    props.gender,
    props.teesSelected,
    props.teeValues,
    props.ratings,
    props.slopes,
    props.pars
  );
  return (
    <>
      {rows.map(function (row, i) {
        return (
          <tr key={i}>
            <th scope='row'>{row[0]}</th>
            <td>{row[1]}</td>
            <td>{row[2]}</td>
            <td>{row[3]}</td>
            <td>{row[4]}</td>
            <td>{row[5]}</td>
            <td>{row[6]}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TSTableBody;
