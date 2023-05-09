import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  height: 82vh;

  background: url('/images/start_game.jpeg') no-repeat;
  background-position: center;
  background-size: cover;

  > .btn {
    position: absolute;
    bottom: 10%;
    left: 0;
    right: 0;

    width: 240px;
    height: 82px;
    margin: auto;

    font-size: 24px;
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #fef388;
    line-height: 18px;
    text-shadow: 0px 2px 0px #190801;
    text-align: center;
    line-height: 64px;

    background: url('${require('@horse-racing/app-config/assets/stay_tuned.png')}') no-repeat;

    cursor: pointer;
  }
`;

const StartGame: React.FC = () => {
  return (
    <Wrapper>
      <div
        className="btn"
        onClick={() => {
          window.open('https://game.horsefi.games/');
        }}
      >
        Start Game
      </div>
    </Wrapper>
  );
};

export default StartGame;
