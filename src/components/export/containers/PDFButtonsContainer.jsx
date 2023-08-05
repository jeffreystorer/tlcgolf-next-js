import React from 'react';
import { useRecoilState } from 'recoil';
import { DownloadPDFButton } from '@/components/export/buttons';
import { DimensionsDropdown } from '@/components/export/dropdowns';
import { dimensionsOptionItems } from '@/components/export/optionitems';
import * as state from '@/store';

const PDFButtonsContainer = ({ pdfLoading, currentRef }) => {
  const [dimensionIndex, setDimensionIndex ] = useRecoilState(state.dimensionIndex);

  const handleDimensionIndexChange = (event) => {
    setDimensionIndex(event.target.value);
  };

  return (
    <>
      {pdfLoading ? (
        <p> Loading . . .</p>
      ) : (
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
            <>
              <table className='table_pdfs'>
                <tbody>
                  <tr>
                    <td>
                      <DownloadPDFButton
                        type={'portrait'}
                        element={currentRef}
                      />
                    </td>
                    <td>
                      <DownloadPDFButton
                        type={'landscape'}
                        element={currentRef}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
            </>
          )}
        </div>
      )}
    </>
  );
};
export default PDFButtonsContainer;
