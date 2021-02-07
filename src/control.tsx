/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { HTMLAttributes, ReactNode } from 'react';

export interface SliderControlProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

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

export const leftStyle = css`
  ${baseStyle}
  left: 20px;
`;

export const rightStyle = css`
  ${baseStyle}
  right: 20px;
`;

export function LeftSliderControl(props: SliderControlProps) {
  return <div css={leftStyle} {...props} />;
}

export function RightSliderControl(props: SliderControlProps) {
  return <div css={rightStyle} {...props} />;
}
