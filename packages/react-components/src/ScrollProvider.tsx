/**
 * document scroll
 */
import React, { useContext, useEffect, useRef, useState } from 'react';

import { ScrollContextState } from './types';

const ScrollContext = React.createContext<ScrollContextState>({} as any);

const getScrollTop = () => {
  return Math.max(document.body.scrollTop, document.documentElement.scrollTop);
};

const getScrollLeft = () => {
  return Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
};

const ScrollProvider: React.FunctionComponent = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollTopRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const [scrollTopOffset, setScrollTopOffset] = useState(0);
  const [scrollLeftOffset, setScrollLeftOffset] = useState(0);

  useEffect(() => {
    scrollTopRef.current = scrollTop;
    scrollLeftRef.current = scrollLeft;
  }, [scrollLeft, scrollTop]);

  useEffect(() => {
    setScrollTop(getScrollTop());
    setScrollLeft(getScrollLeft());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop();
      const scrollLeft = getScrollLeft();

      setScrollTopOffset(scrollTop - scrollTopRef.current);
      setScrollLeftOffset(scrollLeft - scrollLeftRef.current);
      setScrollTop(scrollTop);
      setScrollLeft(scrollLeft);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return (
    <ScrollContext.Provider value={{ scrollTop, scrollLeft, scrollTopOffset, scrollLeftOffset }}>
      {children}
    </ScrollContext.Provider>
  );
};

const useScroll = (): ScrollContextState => {
  const context = useContext(ScrollContext);

  if (context === undefined) {
    throw new Error('useScroll must provide by ScrollProvider');
  }

  return context;
};

export { ScrollProvider, useScroll };
