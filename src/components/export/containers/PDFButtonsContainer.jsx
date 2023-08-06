import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DownloadPDFButton } from '@/components/export/buttons';
import { DimensionsDropdown } from '@/components/export/dropdowns';
import { dimensionsOptionItems } from '@/components/export/optionitems';
import * as state from '@/store';

const PDFButtonsContainer = ({ pdfLoading, currentRef }) => {
  const [dimensionIndex, setDimensionIndex] = useRecoilState(
    state.dimensionIndex
  );
  const showDownloadPDF = useRecoilValue(state.showDownloadPDF);

  const handleDimensionIndexChange = (event) => {
    setDimensionIndex(event.target.value);
  };
  if (pdfLoading) return <p> Loading PDF...</p>;

  return (
    <>
      {showDownloadPDF && (
        <div id='download-pdf' className='titled_outer'>
          <h2>Download PDF</h2>
          <div className='select-dropdown-container'>
            <label>
              Select PDF Format
              <select
                value={dimensionIndex}
                onChange={handleDimensionIndexChange}>
                {dimensionsOptionItems}
              </select>
            </label>
          </div>
          <br />
          {dimensionIndex > 0 && (
            <div id='pdfbuttons'>
              <DownloadPDFButton type={'portrait'} element={currentRef} />
              <DownloadPDFButton type={'landscape'} element={currentRef} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default PDFButtonsContainer;
