import React, { useState, useEffect } from 'react';
import InViewObserver from './InViewObserver';
import AmIInView from './AmIInView';
import Placeholder from './Placeholder';
import Loading from './Loading';
import { delay } from '../utils';
import CancellableLazyLoader from './CancellableLoader';

const lazyLoadComponent = (res) =>
  import('./Lazyboy.js')
    .then(delay(5000))
    .then((component) => res(component.default))
    .catch((err) => console.log(err) || res(<div>Oops</div>));

const Main = () => {
  const [LazyBoy, loadLazyBoy] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    if (shouldLoad) {
      lazyLoadComponent(loadLazyBoy);
    }
  }, [shouldLoad]);

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#AEECEF',
        }}
      >
        <div>I'm the main block</div>
      </div>
      <InViewObserver threshold={0.8}>
        <AmIInView />
      </InViewObserver>
      <InViewObserver onInView={() => setShouldLoad(true)} threshold={0.9}>
        <React.Fragment>
          {shouldLoad ? LazyBoy ? LazyBoy : <Loading /> : <Placeholder />}
        </React.Fragment>
      </InViewObserver>
      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((delay, index) => (
        <InViewObserver key={index} threshold={0.8}>
          <CancellableLazyLoader delay={delay} />
        </InViewObserver>
      ))}
    </div>
  );
};

export default Main;
