import React from 'react';
import loadable from '@loadable/component';
import { IconProps } from './utilities';

const LazyIcon = loadable(() => import('components/common/icons/components'));

/**
 * Icon used throughout app
 * @param name
 * @param size
 * @param onClick
 * @param css use path -> fill property, if border -> stroke
 */
export const Icon = ({ contentcss, name, size, onClick }: IconProps) => (
  <LazyIcon contentcss={contentcss} size={size} name={name} onClick={onClick} />
);

export { IconName, IconSize } from './utilities';
