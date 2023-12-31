import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dimensionArray } from '@/components/export/optionitems';
import * as state from '@/store';
import { createPDF } from '@/components/export/utils';
export default function DownLoadPDFButton({ type, element }) {
  const setShowDownloadPDF = useSetRecoilState(state.showDownloadPDF);
  const setShowDownloadPDFButton = useSetRecoilState(
    state.showDownloadPDFButton
  );
  const dimensionIndex = useRecoilValue(state.dimensionIndex);
  const rowCount = dimensionArray[dimensionIndex][0];
  const colCount = dimensionArray[dimensionIndex][1];
  const dims = rowCount + ' X ' + colCount;
  let buttonText;
  switch (type) {
    case 'portrait':
      buttonText = 'Portrait  ' + dims;
      break;
    case 'landscape':
      buttonText = 'Landscape  ' + dims;
      break;
    default:
      break;
  }

  function handleClick() {
    setShowDownloadPDF(false);
    setShowDownloadPDFButton(true);
    createPDF(type, element, dims);
  }

  return <button onClick={handleClick}>{buttonText}</button>;
}
