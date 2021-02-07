import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Slider from '../.';

const App = () => {
  return (
    <div>
      <h1>Slider</h1>
      <div
        style={{
          maxWidth: '500px',
        }}
      >
        <Slider
          arrows={{
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
          }}
          style={{
            minHeight: '100px',
          }}
        >
          <h2>Slide 1</h2>
          <h2>Slide 2</h2>
          <h2>Slide 3</h2>
        </Slider>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
