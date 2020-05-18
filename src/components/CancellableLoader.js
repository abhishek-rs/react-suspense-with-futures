import React, { useState, useEffect } from 'react';
import { getCancellableFuture } from '../api';
import Loading from './Loading';
import Placeholder from './Placeholder';

const URL = (delay) => `https://httpbin.org/delay/${delay}`;

const CancellableLazyLoader = ({ inView, delay }) => {
  const [data, setData] = useState(null);
  const [cancelRequest, setCancelRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleResolution = (result) => {
    setData(result);
    setLoading(false);
    setCancelRequest(null);
  };

  const startFetch = () => {
    const url = URL(delay);
    setLoading(true);
    const cancelFn = getCancellableFuture(url, handleResolution);
    setCancelRequest(() => cancelFn);
  };

  const handleCancel = () => {
    cancelRequest && cancelRequest();
    setLoading(false);
    setCancelRequest(null);
  };

  useEffect(() => {
    if (!data && inView) {
      startFetch();
    }
    if (!inView && cancelRequest) {
      handleCancel();
    }
    return () => cancelRequest && cancelRequest();
  }, [inView]);

  let Component;
  if (loading) {
    Component = <Loading />;
  } else if (data) {
    Component = (
      <div
        style={{
          textAlign: 'center',
          height: '33vh',
          background: '#3066BE',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <span>{`We got the request from ${data}`}</span>
      </div>
    );
  } else {
    Component = <Placeholder />;
  }

  return <React.Fragment>{Component}</React.Fragment>;
};

export default CancellableLazyLoader;
