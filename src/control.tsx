import { css } from '@emotion/react';
import styled from '@emotion/styled';

const baseStyle = css`
  top: calc(50% - 20px);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  z-index: 2;
`;

export const LeftSliderControl = styled.div`
  ${baseStyle}
  left: 20px;
`;
export const RightSliderControl = styled.div`
  ${baseStyle}
  right: 20px;
`;
