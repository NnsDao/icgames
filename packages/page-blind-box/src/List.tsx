import { parseEther } from '@ethersproject/units';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { FormatBalance, Grid } from '@horse-racing/react-components';
import { colorPrimary } from '@horse-racing/react-components/style';
import { marginMedia, paddingMedia, widthMedia } from '@horse-racing/react-components/style/media';

import { useCurrentTokenId } from './useCurrentTokenId';

const Wrapper = styled.div`
  width: 100%;

  background: linear-gradient(180deg, #050001 0%, #180f08 49%, #0d0804 100%);

  > .banner {
    width: 100%;
    height: 50vh;
    background: url('/images/blind-box-banner.png') no-repeat;
    background-size: cover;
    background-position: center;
  }

  > img {
    width: 100%;
    max-height: 50vh;

    object-fit: cover;
    object-position: center;
  }

  > .list {
    ${widthMedia()};
    margin: 0 auto;
    ${marginMedia(1, 2)};
  }
`;

const Cell = styled.div`
  position: relative;

  max-width: 284px;
  border: 2px solid #4d3608;
  cursor: pointer;
  margin: 0 auto;

  :hover {
    border-color: #d4b35d;
  }

  > .top {
    position: relative;

    > .blind-box-img {
      width: 100%;
    }
    > .blind-box-notstart {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;

      width: 100%;

      background-image: radial-gradient(rgba(226, 185, 80, 0.5), rgba(76, 53, 7, 0.5));
      filter: blur(2px);
    }
  }

  > .bottom {
    ${paddingMedia(0.25, 0.25, 0.25, 0.25)};

    h6 {
      color: ${colorPrimary};
    }

    p {
      display: flex;
      align-items: center;

      > img {
        width: 20px;
        margin-right: 6px;
      }
    }
  }
`;

const Bage = styled.div`
  z-index: 2;
  position: absolute;
  left: 8px;
  top: 8px;

  height: 20px;
  padding: 0 8px;

  line-height: 20px;
  border-radius: 4px;
  border: 1px solid ${colorPrimary};
`;

const List: React.FC = () => {
  const currentTokenId = useCurrentTokenId();
  const { push } = useHistory();

  return (
    <Wrapper>
      {/* <div className="banner"></div> */}
      <img src="/images/blind-box-banner.png" />
      <Grid className="list" spans={[6, 4, 4, 3, 2, 1]}>
        <Cell onClick={() => push('/blind-box/0')}>
          <Bage>{currentTokenId.gt('3000') ? 'Sold Out' : 'On Sell'}</Bage>
          <div className="top">
            <img className="blind-box-img" src="/images/blind-box.png" />
          </div>
          <div className="bottom">
            <h6>Genesis Ⅰ</h6>
            <p>
              <img src={require('@horse-racing/app-config/assets/avax.png')} />
              <FormatBalance balance={parseEther('5')} showSymbol />
            </p>
          </div>
        </Cell>
        <Cell onClick={() => push('/blind-box/1')}>
          <Bage>{currentTokenId.gt('3000') ? 'Sold Out' : 'On Sell'}</Bage>
          <div className="top">
            <img className="blind-box-img" src="/images/blind-box.png" />
          </div>
          <div className="bottom">
            <h6>Genesis ⅠⅠ</h6>
            <p>
              <img src={require('@horse-racing/app-config/assets/avax.png')} />
              <FormatBalance balance={parseEther('7')} showSymbol />
            </p>
          </div>
        </Cell>
        <Cell onClick={() => push('/blind-box/2')}>
          <Bage>{currentTokenId.gt('3000') ? 'Sold Out' : 'On Sell'}</Bage>
          <div className="top">
            <img className="blind-box-img" src="/images/blind-box.png" />
          </div>
          <div className="bottom">
            <h6>Genesis ⅠⅠⅠ</h6>
            <p>
              <img src={require('@horse-racing/app-config/assets/avax.png')} />
              <FormatBalance balance={parseEther('9')} showSymbol />
            </p>
          </div>
        </Cell>
      </Grid>
    </Wrapper>
  );
};

export default List;
