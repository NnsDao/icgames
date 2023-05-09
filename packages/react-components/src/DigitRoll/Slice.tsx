import React, { PureComponent } from 'react';

import { getArr } from './util';

interface Props {
  delay: number;
  digit: number;
  height: number;
  width: number;
}

export default class Slice extends PureComponent<Props> {
  override state = {
    offset: 0,
    isRolling: false,
    prevDigit: 0
  };

  override componentDidMount = () => {
    const { digit, height } = this.props;
    const offset = -digit * height;

    setTimeout(() => {
      this.setState({ offset, isRolling: true });
    }, 100);
  };

  override UNSAFE_componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.digit !== this.props.digit) {
      this.reset(this.props.digit);
      // slice move in animation
      const diff = nextProps.digit - this.props.digit;
      const offset = diff > 0 ? -diff * this.props.height : -(diff + 10) * this.props.height;

      setTimeout(() => {
        this.setState({ offset, isRolling: true });
      }, 100);
    }
  };

  reset = (prevDigit: number) => {
    this.setState({ offset: 0, isRolling: false, prevDigit });
  };

  override render() {
    const { delay, digit, height, width } = this.props;
    const arr = getArr(this.state.prevDigit, digit);

    return (
      <div
        className={'DigitRoll__Slice }'}
        style={{
          marginTop: this.state.offset,
          transition: this.state.isRolling ? `margin ${delay}s ease` : ''
        }}
      >
        {arr.map((d, index) => (
          <div className="DigitRoll__Cell" key={index} style={{ height, width }}>
            <span>{d}</span>
          </div>
        ))}
      </div>
    );
  }
}
