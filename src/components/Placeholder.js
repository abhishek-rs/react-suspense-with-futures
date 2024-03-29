import React from 'react';

const Placeholder = ({ inView, text = '' }) => (
    <div
        style={{
            textAlign: 'center',
            height: '33vh',
            background: '#6D9DC5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}
    >
        <span>{text || `I'm a placeholder`}</span>
    </div>
);

export default Placeholder;
