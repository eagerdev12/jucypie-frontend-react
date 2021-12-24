import React from 'react';
import { Row } from 'antd';
import styled from 'styled-components';

const TopMenu = ({ children }) => {
  return <Panel>{children}</Panel>;
};

const Panel = styled(Row)`
  position: fixed;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  @media only screen and (min-width: 450px) {
    position: absolute;
    height: 60px;
    left: 260px;
    width: 600px;
  }
`;

export default TopMenu;
