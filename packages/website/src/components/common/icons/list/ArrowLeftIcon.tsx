import styled from '@emotion/styled';
import { ReactComponent as ArrowLeft } from 'media/icons/arrow_left.svg';
import { IconBaseProps, iconCss } from '../utilities';

const ArrowLeftIcon = styled(ArrowLeft)<IconBaseProps>`
  ${(props: IconBaseProps) => iconCss(props)};
`;

export default ArrowLeftIcon;
