import React from 'react';

const Loading = ({ inView }) => (
  <div
    style={{
      textAlign: 'center',
      height: '33vh',
      background: '#119DA4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <span>Loading........... </span>
  </div>
);

export default Loading;
