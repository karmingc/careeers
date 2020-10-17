import React from 'react';
import ArrowLeftIcon from './list/ArrowLeftIcon';
import ArrowRightIcon from './list/ArrowRightIcon';

import { IconName, IconProps } from './utilities';

export default React.memo(function IconImport({
  contentcss,
  name,
  size,
  onClick
}: IconProps) {
  switch (name) {
    case IconName.ArrowLeft:
      return (
        <ArrowLeftIcon size={size} onClick={onClick} contentcss={contentcss} />
      );
    case IconName.ArrowRight:
      return (
        <ArrowRightIcon size={size} onClick={onClick} contentcss={contentcss} />
      );
    default:
      return <React.Fragment />;
  }
});
