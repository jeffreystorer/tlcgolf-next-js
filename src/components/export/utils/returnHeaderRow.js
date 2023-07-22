import { getExportTeesSelectedArray } from '@/components/export/utils';

export default function returnHeaderRow(teesSelected) {
  let teesSelectedArray = getExportTeesSelectedArray(teesSelected);
  teesSelectedArray.unshift('');
  return teesSelectedArray;
}
