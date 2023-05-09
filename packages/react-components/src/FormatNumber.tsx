import React, { useMemo } from 'react';
import styled from 'styled-components';
import { currencyFormat } from '@horse-racing/app-config/utils';
import { defaultSymbol } from '@horse-racing/app-config/constants';
const Wrapper = styled.div`
  img{
    display:inline-block;
    vertical-align:middle;
    line-height:1;
    margin:-2px 5px 0 0;
    width:8px;
  }
`;

interface Props {
  balance?: string|number;
  decimals?: number; // precision
  symbol?: string;
  showSymbol?: boolean; // unit
}

export const formatDisplay = (value: string, decimal = 3) => {
  if (value.includes('.')) {
   return Number(value).toFixed(decimal)
    // const [pre, suf] = value.split('.');
    // return decimal === 0 ? pre : pre + '.' + suf.slice(0, decimal);
  } else {
    return value;
  }
};

const FormatNumber: React.FC<Props> = ({
  balance = '0',
  decimals = 2,
  showSymbol = false,
  symbol = defaultSymbol,
}) => {
  const display = useMemo(() => {
    return formatDisplay(balance, decimals);
  }, [balance, decimals]);
  const displaySymbol = useMemo((): string => {
    return symbol;
  }, [symbol]);
  if(showSymbol){
    return <>{display + displaySymbol}</>;
  }else{
    return <Wrapper><img src={`/images/${displaySymbol}.svg`} />{display}</Wrapper>;
  }
};

export default React.memo<typeof FormatNumber>(FormatNumber);
