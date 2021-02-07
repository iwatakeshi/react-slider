import React from 'react';
import * as ReactDOM from 'react-dom';
import Slider from '../src/index';

describe('Slider', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Slider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
