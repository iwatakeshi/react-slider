/** @jsxRuntime classic */
/** @jsx jsx */
import { HTMLAttributes, ReactNode } from 'react';
import { css, jsx } from '@emotion/react';

export interface SlideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Slide(props: SlideProps) {
  return (
    <div
      css={css`
        will-change: transform;
        user-select: none;
        pointer-events: none;
        margin: auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      {...props}
    />
  );
}
