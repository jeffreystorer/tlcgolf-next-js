import React from 'react';
import { useRecoilValue } from 'recoil';
import { TitledBox } from '@/components/common';
import { DownloadPDFButton } from '@/components/export/buttons';
import { DimensionsDropdown } from '@/components/export/dropdowns';
import * as state from '@/store';

const PDFButtonsContainer = ({ pdfLoading, currentRef }) => {
  const dimensionIndex = useRecoilValue(state.dimensionIndex);
  return (
    <>
      {pdfLoading ? (
        <p> Loading . . .</p>
      ) : (
        <>
          <br />
          <br />
          <TitledBox title={'Download PDF'}>
            <div className='center'>
              <div className='select-dropdown-container'>
                <span>Select PDF Format:&nbsp;&nbsp;</span>
                <DimensionsDropdown />
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
          </TitledBox>
        </>
      )}
    </>
  );
};
export default PDFButtonsContainer;
