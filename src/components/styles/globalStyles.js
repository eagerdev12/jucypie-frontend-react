import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .ant-btn-primary[disabled] {
    background: #80CAFB;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;
    line-height: 15px;
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      background: #80CAFB;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .ant-card-bordered {
    @media only screen and (max-width: 451px) {
      border-radius: 0px;
    }
  }

  .ant-card-body {
    width: 100%;
  }

  .ant-btn {
    height: 30px;
    background: #ffffff;
    border: 1px solid #0095f8;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 15px;
    line-height: 15px;
    color: #0095f8;
  }

  .ant-btn-primary {
    background: #0095f8;
    border-color: #0095f8;
    color: white;
    border: none;
  }

  b {
    padding-right: 4px;
  }

  body {
    margin: 0px;
    font-family: 'Proxima Nova';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: normal;
    font-size: 16px;
    background: #F6F8F9;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  p {
    font-family: 'Proxima Nova';
  }

  span {
    font-family: 'Proxima Nova';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: normal;
  }

  a {
    color: #404950;
    cursor: pointer;
  }

  .ant-tabs-tab ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      font-weight: bold;
    }
  }

  .ant-select-selector {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  .ant-picker{
    padding: 14px 16px;
    font-family: Proxima Nova;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 17px;
    border: none;
    .ant-picker-input {
      input{
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 17px;
        &:placeholder{
          color: #788995;
          font-family: Proxima Nova;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 17px;
          border: none;
        }
      }
    }
  }

  .ant-select{
    .ant-select-selector{
      padding: 0 16px !important;
      height: 45px !important;
      .ant-select-selection-search{
        input{
          height: 45px !important;
          font-family: Proxima Nova;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 45px;
          color: #788995;
        }
      }
      .ant-select-selection-item{
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 45px;
        color: #788995;
      }
      .ant-select-selection-placeholder{
        font-family: Proxima Nova;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 45px;
        color: #788995;
      }
    }
  }
`;
