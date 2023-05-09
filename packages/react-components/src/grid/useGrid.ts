import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useMemo } from 'react';

interface UseGrid {
  rowNum: number;
  spans: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  gutter: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  gutterSize: number;
}

export const useGrid = (spans: [number, number, number, number, number, number]): UseGrid => {
  const breakpoint = useBreakpoint();

  const [rowNum, gutterSize] = useMemo(() => {
    let num: number;
    let size: number;

    if (breakpoint.xxl) {
      num = spans[0];
      size = 24;
    } else if (breakpoint.xl) {
      num = spans[1];
      size = 24;
    } else if (breakpoint.lg) {
      num = spans[2];
      size = 24;
    } else if (breakpoint.md) {
      num = spans[3];
      size = 14;
    } else if (breakpoint.sm) {
      num = spans[4];
      size = 14;
    } else {
      num = spans[5];
      size = 14;
    }

    return [num, size];
  }, [breakpoint.lg, breakpoint.md, breakpoint.sm, breakpoint.xl, breakpoint.xxl, spans]);

  return {
    rowNum,
    spans: {
      xs: 24 / spans[5],
      sm: 24 / spans[4],
      md: 24 / spans[3],
      lg: 24 / spans[2],
      xl: 24 / spans[1],
      xxl: 24 / spans[0]
    },
    gutter: {
      xs: 14,
      sm: 14,
      md: 14,
      lg: 24,
      xl: 24,
      xxl: 24
    },
    gutterSize
  };
};
