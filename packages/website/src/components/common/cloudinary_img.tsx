/** @jsx jsx */
import { jsx, SerializedStyles } from '@emotion/core';
import React from 'react';

const cloudinaryUrl = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

interface CloudinaryImgProps {
  key?: string;
  cloudinaryId: string;
  alt: string;
  contentCss?: SerializedStyles | SerializedStyles[];
  style?: React.CSSProperties;
  onLoad?: () => void;
}

// image are currently sized below 1000 pixels, if we receive larger ones
// will need to consider using transformations to fetch appropriate size

// will need to add animations
export const CloudinaryImg = React.memo<CloudinaryImgProps>((props) => {
  const { cloudinaryId, alt, contentCss, style, onLoad } = props;

  return (
    <img
      style={style}
      src={`${cloudinaryUrl}q_auto,f_auto,fl_progressive/${cloudinaryId}`}
      alt={alt}
      css={contentCss}
      onLoad={onLoad}
    />
  );
});
