import React, { useState, useEffect, useRef } from 'react';
import { ReactPhotoCollage } from 'react-photo-collage';
import { useRecoilValue } from 'recoil';
import { BlankLines } from '@/components/common';
import {
  CopyAndDownloadButtonsContainer,
  PDFButtonsContainer,
} from '@/components/export/containers';
import { LineupImage, Collage } from '@/components/export/images';
import { dimensionArray } from '@/components/export/optionitems';
import * as state from '@/store';
import { get, set } from '@/components/common/utils';
import { returnCollageSetting } from '@/components/export/utils';

const ButtonsAndImagesContainer = ({ dimensionIndex }) => {
  const dataUrl = useRecoilValue(state.screenshotUrl);
  const ref = useRef();
  let index = dimensionIndex;
  if (index === 0) index = index + 1;

  //PDF Creation

  const rowCount = dimensionArray[index][0];
  const colCount = dimensionArray[index][1];
  const [pdfLoading, setPDFLoading] = useState(true);
  const [pcSetting, setPCSetting] = useState();
  const img = new Image();
  img.src = dataUrl;
  let factor = 2.0;

  let pcWidth = img.width * colCount * factor;
  let pcWidthPx = pcWidth.toString() + 'px';
  let pcHeight = img.height * factor;
  let pcHeightPx = pcHeight.toString() + 'px';
  let pcDim = {
    width: pcWidth,
    height: pcHeight * rowCount,
  };
  let pcStyleWidth = pcDim.width + 'px';
  let pcStyleHeight = pcDim.height + 'px';

  set('pdfDim', pcDim);

  set('styleDims', [pcStyleWidth, pcStyleHeight]);
  const styleDims = get('styleDims');

  const PCCollage = () => <ReactPhotoCollage {...pcSetting} />;

  useEffect(() => {
    setPCSetting(
      returnCollageSetting(dataUrl, rowCount, colCount, pcWidthPx, pcHeightPx)
    );

    setPDFLoading(false);
  }, [colCount, dataUrl, pcHeightPx, pcWidthPx, rowCount]);

  return (
    <>
      <CopyAndDownloadButtonsContainer />
      <PDFButtonsContainer pdfLoading={pdfLoading} currentRef={ref} />
      <BlankLines lines={35} />
      <LineupImage />
      <BlankLines lines={5} />
      <Collage
        ref={ref}
        pdfLoading={pdfLoading}
        PCCollage={PCCollage}
        styleDims={styleDims}
      />
    </>
  );
};
export default ButtonsAndImagesContainer;
