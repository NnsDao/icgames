import React from 'react';
import styled from 'styled-components';

import { Grid } from '@horse-racing/react-components';
import media, { marginMedia, widthMedia } from '@horse-racing/react-components/style/media';

const Wrapper = styled.div`
  > .content {
    ${widthMedia()};
    margin: 0 auto;
    ${marginMedia(4)};

    img {
      width: 100%;
    }
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
  height: 496px;
  margin: 0 auto;

  background: url('/images/horse-border.png') no-repeat;
  background-size: cover;
  background-position: center;

  > div {
    width: 78%;
    height: 82%;
    padding: 10px;

    background: linear-gradient(180deg, #e2b950 0%, #4c3507 100%);
    border-radius: 20px;

    p {
      ${marginMedia(0.5)};
    }
  }

  ${media('xl')} {
    width: 378px;
    height: 446.4px;
  }

  ${media('xl')} {
    width: 330px;
    height: 389.7px;

    p {
      font-size: 12px;
      line-height: 1.5;
    }
  }
`;

const Horse: React.FC = () => {
  return (
    <Wrapper>
      <Grid className="content" spans={[3, 3, 2, 1, 1, 1]}>
        <Cell>
          <div>
            <img src="/images/horse-img1.png" />
            <p>
              All players with horses can get rich token rewards by participating in the
              competition.
            </p>
          </div>
        </Cell>
        <Cell>
          <div>
            <img src="/images/horse-img2.png" />
            <p>
              Players can use shrw to trade horses and blind boxes in the market. The price of
              horses will be determined by the buyer and the seller.
            </p>
          </div>
        </Cell>
        <Cell>
          <div>
            <img src="/images/horse-img3.png" />
            <p>
              Each player can use two horses to breed pups. The higher the pedigree of the stallion,
              the higher the pedigree of the young horse.
            </p>
          </div>
        </Cell>
      </Grid>
      <Grid className="content" spans={[2, 2, 2, 2, 1, 1]}>
        <img src="/images/horse1.png" />
        <img src="/images/horse2.png" />
      </Grid>
    </Wrapper>
  );
};

export default Horse;
