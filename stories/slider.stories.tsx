import React from 'react';
import { Meta, Story } from '@storybook/react';
import Slider, { SliderProps } from '../src';

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
};

export default meta;

const Template: Story<SliderProps> = args => (
  <Slider {...args}>
    <h1>Hello</h1>
    <h1>Hello2</h1>
    <h1>Hello3</h1>
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
    minHeight: '100px',
  },
  arrows,
};

export const Dots = Template.bind({});

Dots.args = {
  style: {
    minHeight: '300px',
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
