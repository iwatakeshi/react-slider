import React, { CSSProperties } from 'react';
import { Meta, Story } from '@storybook/react';
import Slider, { SliderProps } from '../src';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const meta: Meta = {
  title: 'Slider',
  component: Slider,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
  decorators: [
    (Story: Story<SliderProps>) => (
      <div style={{ width: '100%', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: Story<SliderProps> = args => (
  <Slider {...args}>
    <Wrapper>
      <h1>Hello</h1>
    </Wrapper>
    <Wrapper>
      <h1>Hello 2</h1>
    </Wrapper>
    <Wrapper>
      <h1>Hello 3</h1>
    </Wrapper>
  </Slider>
);

const arrows = {
  left: (
    <div
      style={{
        border: '1px solid black',
        borderRadius: 999,
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span
        style={{
          transform: 'scale(-1)',
        }}
      >
        {'‣'}
      </span>
    </div>
  ),
  right: (
    <div
      style={{
        border: '1px solid black',
        borderRadius: 999,
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span>{'‣'}</span>
    </div>
  ),
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  arrows,
};

export const Dots = Template.bind({});

Dots.args = {
  style: {
    // minHeight: '300px',
  },
  arrows,
  dots: function(index) {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
        }}
      >
        Current index: {index}
      </div>
    );
  },
};
