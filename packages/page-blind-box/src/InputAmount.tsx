import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  onChange(value: string): void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;

  > img {
    cursor: pointer;
    user-select: none;
  }

  > input {
    width: 120px;
    height: 30px;

    border-radius: 2px;
    border: 1px solid #c3c6cc;

    background-color: transparent;
    outline: none;

    text-align: center;
  }
`;

const InputAmount: React.FC<Props> = ({ onChange, value }) => {
  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const _reduce = useCallback(() => {
    onChange(String(Math.max(1, parseInt(value) - 1)));
  }, [onChange, value]);
  const _increase = useCallback(() => {
    onChange(String(Math.min(5, parseInt(value) + 1)));
  }, [onChange, value]);

  return (
    <Wrapper>
      <img onClick={_reduce} src={require('@horse-racing/app-config/assets/reduce.svg')} />
      <input onChange={_onChange} value={value} />
      <img onClick={_increase} src={require('@horse-racing/app-config/assets/increase.svg')} />
    </Wrapper>
  );
};

export default React.memo(InputAmount);
