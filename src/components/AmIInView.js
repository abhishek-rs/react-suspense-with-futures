import React from 'react';

// Dumb block to test the inViewObserver
const AmIInView = ({ inView }) => (
  <div
    style={{
      textAlign: 'center',
      height: '33vh',
      background: '#80DED9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <span>{inView ? 'You can see me' : "You can't see me"}</span>
  </div>
);

export default AmIInView;
