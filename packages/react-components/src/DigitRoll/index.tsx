import './default.css';

import React, { PureComponent } from 'react';

import Slice from './Slice';
import { formatDigit } from './util';

interface Props {
  className?: string;
  delay?: number;
  divider?: string;
  height?: number;
  width: number;
  length?: number;
  num: number | string;
  splitLength?: number;
}

export default class DigitRoll extends PureComponent<Props> {
  override render() {
    const {
      className = '',
      delay = 2,
      divider = '',
      height = 44,
      length,
      num = '000000',
      splitLength = 3,
      width = 30
    } = this.props;

    const numArr = formatDigit(num, length, divider, splitLength);
    const validDivider =
      divider !== undefined && (typeof divider === 'string' || typeof divider === 'number');

    return (
      <div className="DigitRoll__Out" style={{ display: 'flex' }}>
        <div className={`DigitRoll ${className}`} style={{ height: height }}>
          {numArr.map((d, index) => {
            if (validDivider && index % (splitLength + 1) === splitLength) {
              return <Divider divider={divider} height={height} key={index} />;
            }

            return (
              <Slice delay={delay} digit={Number(d)} height={height} key={index} width={width} />
            );
          })}
        </div>
      </div>
    );
  }
}

const Divider = ({ divider, height }: { divider: string; height: number }) => (
  <div className="DigitRoll__Divider" style={{ height: height }}>
    {divider}
  </div>
);
