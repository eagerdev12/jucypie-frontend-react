import React from 'react';
import { Row } from 'antd';
import styled from 'styled-components';

const TopBar = ({ children, show }) => {
  return <Bar show={show}>{children}</Bar>;
};

const Bar = styled(Row)`
  display: flex !important;
  position: fixed;
  width: 600px;
  flex-flow: nowrap;
  align-items: center;
  display: ${(props) => (props.show ? 'initial' : 'none')};
  z-index: 1;
  @media only screen and (max-width: 451px) {
    width: 100%;
    margin-top: 44px;
  }
`;

export default TopBar;
