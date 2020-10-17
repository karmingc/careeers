import styled from '@emotion/styled';
import { ReactComponent as ArrowRight } from 'media/icons/arrow_right.svg';
import { IconBaseProps, iconCss } from '../utilities';

const ArrowRightIcon = styled(ArrowRight)<IconBaseProps>`
  ${(props: IconBaseProps) => iconCss(props)};
`;

export default ArrowRightIcon;
