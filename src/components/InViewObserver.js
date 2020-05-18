import React, {
  useEffect,
  useRef,
  useState,
  isValidElement,
  cloneElement,
} from 'react';

const InViewObserver = ({
  onInView,
  onOutOfView,
  rootMargin = '0px',
  threshold = 0,
  children,
}) => {
  const boundingRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    let intersectionObserver;
    if (boundingRef) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              onInView && onInView();
              setIsInView(true);
            }

            if (!e.isIntersecting) {
              onOutOfView && onOutOfView();
              setIsInView(false);
            }
          });
        },
        {
          root: null,
          rootMargin: rootMargin,
          threshold: threshold,
        }
      );
      intersectionObserver.observe(boundingRef.current);
    }
    return () =>
      intersectionObserver &&
      intersectionObserver.unobserve(boundingRef.current);
  }, [boundingRef, onInView, onOutOfView, rootMargin, threshold]);

  return (
    <div ref={boundingRef} style={{ display: 'inline' }}>
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { inView: isInView });
        }
        return child;
      })}
    </div>
  );
};

export default InViewObserver;
