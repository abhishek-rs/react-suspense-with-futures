import React from 'react';

const Loading = ({ inView, delay }) => (
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
        <span>
            {delay
                ? `I will take ${delay} seconds to load ....`
                : 'Loading ...'}
        </span>
    </div>
);

export default Loading;
