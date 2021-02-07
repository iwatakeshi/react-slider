/** @jsxRuntime classic */
/** @jsx jsx */
import { HTMLAttributes, ReactNode } from 'react';
import { css, jsx } from '@emotion/react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Container(props: ContainerProps) {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        margin: auto 0;
      `}
      {...props}
    />
  );
}
