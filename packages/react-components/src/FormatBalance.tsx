import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { defaultSymbol } from '@horse-racing/app-config/constants';
const Wrapper = styled.div`
  img{
    display:inline-block;
    vertical-align:middle;
    line-height:1;
    margin:-2px 5px 0 0;
  }
`;

interface Props {
  balance?: string | BigNumber;
  decimals?: number;
  unit?: number;
  symbol?: string;
  address?: string; // address for erc20
  showSymbol?: boolean;
}

export const formatDisplay = (value: string, decimal = 3) => {
  if (value.includes('.')) {
    const [pre, suf] = value.split('.');
    return decimal === 0 ? pre : pre + '.' + suf.slice(0, decimal);
  } else {
    return value;
  }
};

const FormatBalance: React.FC<Props> = ({
  balance = '0',
  decimals = 18,
  showSymbol = false,
  symbol = defaultSymbol,
  unit = 8
}) => {
  const display = useMemo(() => {
    const value = formatUnits(balance, decimals);
    console.log(value)
    return formatDisplay(value, unit);
  }, [balance, decimals, unit]);
  const displaySymbol = useMemo((): string => {
    return symbol;
  }, [symbol]);
  if(showSymbol){
    return <>{display + displaySymbol}</>;
  }else{
    return <Wrapper><img className='' src={`/images/${displaySymbol}.svg`} />{display}</Wrapper>;
  }
};

export default React.memo<typeof FormatBalance>(FormatBalance);
