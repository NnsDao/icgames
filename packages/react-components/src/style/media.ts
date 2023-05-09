import breakpoint from './breakpoint';

const media = (size: 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'): string => {
  return `@media only screen and (max-width: ${breakpoint[size]})`;
};

export const widthMedia = (): string => `
  width: 1440px;

  ${media('xxl')} {
    width: 1280px;
  }

  ${media('xl')} {
    width: 952px;
  }

  ${media('lg')} {
    width: 728px;
  }

  ${media('md')} {
    width: 536px;
  }

  ${media('sm')} {
    width: 375px;
  }
`;

export const paddingMedia = (mulTop = 0, mulBottom = 0, mulLeft = 0, mulRight = 0): string => `
  ${mulTop ? `padding-top: ${mulTop * 40}px;` : ''}
  ${mulRight ? `padding-right: ${mulRight * 40}px;` : ''}
  ${mulBottom ? `padding-bottom: ${mulBottom * 40}px;` : ''}
  ${mulLeft ? `padding-left: ${mulLeft * 40}px;` : ''}

  ${media('xxl')} {
    ${mulTop ? `padding-top: ${mulTop * 36}px;` : ''}
    ${mulRight ? `padding-right: ${mulRight * 36}px;` : ''}
    ${mulBottom ? `padding-bottom: ${mulBottom * 36}px;` : ''}
    ${mulLeft ? `padding-left: ${mulLeft * 36}px;` : ''}
  }

  ${media('xl')} {
    ${mulTop ? `padding-top: ${mulTop * 32}px;` : ''}
    ${mulRight ? `padding-right: ${mulRight * 32}px;` : ''}
    ${mulBottom ? `padding-bottom: ${mulBottom * 32}px;` : ''}
    ${mulLeft ? `padding-left: ${mulLeft * 32}px;` : ''}
  }

  ${media('lg')} {
    ${mulTop ? `padding-top: ${mulTop * 28}px;` : ''}
    ${mulRight ? `padding-right: ${mulRight * 28}px;` : ''}
    ${mulBottom ? `padding-bottom: ${mulBottom * 28}px;` : ''}
    ${mulLeft ? `padding-left: ${mulLeft * 28}px;` : ''}
  }

  ${media('md')} {
    ${mulTop ? `padding-top: ${mulTop * 24}px;` : ''}
    ${mulRight ? `padding-right: ${mulRight * 24}px;` : ''}
    ${mulBottom ? `padding-bottom: ${mulBottom * 24}px;` : ''}
    ${mulLeft ? `padding-left: ${mulLeft * 24}px;` : ''}
  }

  ${media('sm')} {
    ${mulTop ? `padding-top: ${mulTop * 20}px;` : ''}
    ${mulRight ? `padding-right: ${mulRight * 20}px;` : ''}
    ${mulBottom ? `padding-bottom: ${mulBottom * 20}px;` : ''}
    ${mulLeft ? `padding-left: ${mulLeft * 20}px;` : ''}
  }
`;

export const marginMedia = (mulTop = 0, mulBottom = 0, mulLeft = 0, mulRight = 0): string => `
  ${mulTop ? `margin-top: ${mulTop * 40}px;` : ''}
  ${mulRight ? `margin-right: ${mulRight * 40}px;` : ''}
  ${mulBottom ? `margin-bottom: ${mulBottom * 40}px;` : ''}
  ${mulLeft ? `margin-left: ${mulLeft * 40}px;` : ''}

  ${media('xxl')} {
    ${mulTop ? `margin-top: ${mulTop * 36}px;` : ''}
    ${mulRight ? `margin-right: ${mulRight * 36}px;` : ''}
    ${mulBottom ? `margin-bottom: ${mulBottom * 36}px;` : ''}
    ${mulLeft ? `margin-left: ${mulLeft * 36}px;` : ''}
  }

  ${media('xl')} {
    ${mulTop ? `margin-top: ${mulTop * 32}px;` : ''}
    ${mulRight ? `margin-right: ${mulRight * 32}px;` : ''}
    ${mulBottom ? `margin-bottom: ${mulBottom * 32}px;` : ''}
    ${mulLeft ? `margin-left: ${mulLeft * 32}px;` : ''}
  }

  ${media('lg')} {
    ${mulTop ? `margin-top: ${mulTop * 28}px;` : ''}
    ${mulRight ? `margin-right: ${mulRight * 28}px;` : ''}
    ${mulBottom ? `margin-bottom: ${mulBottom * 28}px;` : ''}
    ${mulLeft ? `margin-left: ${mulLeft * 28}px;` : ''}
  }

  ${media('md')} {
    ${mulTop ? `margin-top: ${mulTop * 24}px;` : ''}
    ${mulRight ? `margin-right: ${mulRight * 24}px;` : ''}
    ${mulBottom ? `margin-bottom: ${mulBottom * 24}px;` : ''}
    ${mulLeft ? `margin-left: ${mulLeft * 24}px;` : ''}
  }

  ${media('sm')} {
    ${mulTop ? `margin-top: ${mulTop * 20}px;` : ''}
    ${mulRight ? `margin-right: ${mulRight * 20}px;` : ''}
    ${mulBottom ? `margin-bottom: ${mulBottom * 20}px;` : ''}
    ${mulLeft ? `margin-left: ${mulLeft * 20}px;` : ''}
  }
`;

const pxRatio = (ratio: 2): string => {
  return `@media screen and (-webkit-min-device-pixel-ratio: ${ratio}),
  screen and (min--moz-device-pixel-ratio: ${ratio})`;
};


export const bgMedia=():string=>`
  background-image: url('/images/bg.png');
  background-repeat:no-repeat;
  ${pxRatio(2)}{
    background-image: url('/images/bg2x.png');
  }
`

export default media;
