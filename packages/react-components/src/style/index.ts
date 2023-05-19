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
  .dialog-styles span {
    font-family: -apple-system, BlinkMacSystemFont, "Arial", "Helvetica Neue", sans-serif;
  }

  .img-styles {
      height: 55px;
      width: 55px;
      padding: 10px;
      box-sizing: content-box;
  }

  @media all and (max-width: 300px) {
      .img-styles {
          width: 11vw;
          max-height: 11vw;
          height: auto;
          padding: 0;
          padding-right: 5px;
      }
  }

  .dialog-styles {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgb(0 0 0 / 60%);
      animation: fade-in 0.18s;
      backdrop-filter: blur(5px);
      cursor: pointer;
      overflow: auto;
      box-sizing: border-box;
      padding: 30px;
  }

  .dialog-container {
      display: grid;
      grid-gap: 5px;
      padding: 10px;
      background: #f4f4f4;
      border-radius: 15px;
      overflow: auto;
      grid-template-columns: 1fr;
      cursor: initial;
      animation: move-in 0.18s;
      max-width: 420px;
      width: 100%;
      box-sizing: border-box;
  }

  .dark .dialog-container {
      background: rgb(35 35 39);
  }

  @keyframes fade-in {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }

  @keyframes move-in {
      from {
          transform: translateY(5%);
      }
      to {
          transform: translateY(0%);
      }
  }

  @-webkit-keyframes fade-out {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }

  .button-styles {
      background: transparent;
      max-width: 100%;
      width: 100%;
      height: 75px;
      padding: 10px;
      border: none;
      border-radius: 11px;
      outline: 0;
      cursor: pointer;
      transition: transform 0.15s;
      display: flex;
      align-items: center;
  }

  .dark .button-styles {
      border: none;
  }

  .button-label {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 21px;
      font-weight: 300;
      color: #424242;
      text-align: left;
  }

  .dark .button-label {
      color: white;
  }

  @media all and (max-width: 300px) {
      .button-label {
          font-size: 6vw;
      }
  }

  .button-styles:hover {
      transform: scale(1.02);
      font-weight: 800!important;
      transition: all 0.2s;
      background: white;
  }

  .dark .button-styles:hover {
      background: #545454;
  }

  .button-styles > div {
      display: flex;
      padding: 0 15px;
      border-radius: 10px;
      font-weight: 400;
      height: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
  }

  .connect-button {
      font-size: 18px;
      background: rgb(35 35 39);
      color: white;
      border: none;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      border-radius: 40px;
      cursor: pointer;
  }

  .connect-button:hover {
      transform: scale(1.03);
      transition: all 0.4s;
  }

  

  ${antdCss()}
  ${fontCss()}
`
);
