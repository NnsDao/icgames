import { paddingMedia } from '@horse-racing/react-components/style/media';
import { createGlobalStyle } from 'styled-components';

import antdCss from './antd';
import fontCss from './font';

export const colorPrimary = '#D5FF40';
export const colorUp = '#00A57B';
export const colorDown = '#D90000';
export const btn = {};
export default createGlobalStyle(
  () => `
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb {
    background: #bfbfbf;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
  ::-webkit-scrollbar-corner {
    background: #179a16;
  }
  ::selection {
    background-color: rgba(21, 178, 229);
    color: rgb(255, 255, 255);
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    color: #FFF;
    background: #000000;
    margin:0 auto;
    max-width:2560px;
  }

  #root {
    height: 100%;
  }

  .linkBtn{
    font-size:16px;
    height: 46px;
    border: 0;
    color: #000;
    border-radius: 2px;
    background:#fff;
    ${paddingMedia(0.35, 0.35, 1.75, 1.75)}
    &:hover {
      opacity: 0.6;
    }
  }
  .primaryBtn{
    font-size:16px;
    height: 46px;
    border: 0;
    border-radius: 2px;
    ${paddingMedia(0.35, 0.35, 1.75, 1.75)}
    color: #fff;
    background: #D5FF40;
    border-radius: 1000px;
    &:hover {
      color:#fff;
      opacity: 0.6;
    }
  }

  ${antdCss()}
  ${fontCss()}
`
);
