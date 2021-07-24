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
        <div
            style={{
                fontFamily: 'Rubik, sans-serif',
            }}
        >
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#AEECEF',
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'white',
                        borderRadius: '8px',
                        padding: '48px',
                        boxShadow: '0 2px 4px gray',
                    }}
                >
                    <h1>
                        Demo of{' '}
                        <a href="https://github.com/abhishek-rs/react-suspense-with-futures">
                            cancellable suspense
                        </a>{' '}
                        components and{' '}
                        <a href="https://github.com/abhishek-rs/throttled-fetch">
                            throttled fetching!
                        </a>
                    </h1>
                    <p
                        style={{
                            fontSize: '1.2rem',
                        }}
                    >
                        When you scroll down from here, all the blocks start
                        requesting content from a demo API when they come into
                        view. But, if you scroll past the block before the
                        request resolves, the component automatically cancels
                        the request and returns to its previous state. These are
                        cancellable-suspense components. Learn more{' '}
                        <a href="https://github.com/abhishek-rs/react-suspense-with-futures">
                            here.
                        </a>
                    </p>
                    <p
                        style={{
                            fontSize: '1.2rem',
                        }}
                    >
                        This is the case for all but the{' '}
                        <em style={{ color: 'orange' }}>second block</em>, in
                        whose case the request always fails. So you'll see that
                        the second or third time you bring it back into view,
                        it's requests get throttled at the client and it doesn't
                        make the request. Learn more{' '}
                        <a href="https://github.com/abhishek-rs/throttled-fetch">
                            here
                        </a>
                        .
                    </p>
                </div>
            </div>
            {[10, 'x', 8, 7, 6, 5, 4, 3, 2, 1].map((delay, index) => (
                <InViewObserver key={index} threshold={0.8}>
                    <CancellableLazyLoader delay={delay} />
                </InViewObserver>
            ))}
            {/*
            <InViewObserver threshold={0.8}>
                <AmIInView />
            </InViewObserver>

            <InViewObserver
                onInView={() => setShouldLoad(true)}
                threshold={0.9}
            >
                <React.Fragment>
                    {shouldLoad ? (
                        LazyBoy ? (
                            LazyBoy
                        ) : (
                            <Loading />
                        )
                    ) : (
                        <Placeholder />
                    )}
                </React.Fragment>
            </InViewObserver>
             */}
        </div>
    );
};

export default Main;
