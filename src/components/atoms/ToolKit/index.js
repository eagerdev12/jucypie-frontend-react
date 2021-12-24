import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const Toolkit = ({ icon, title, active, noMargin, onClick, titleColor }) => {
  return (
    <ToolkitWrapper active={active} onClick={onClick} noMargin={noMargin}>
      {icon}
      {title !== undefined && <ToolkitTitle color={titleColor}>{title}</ToolkitTitle>}
    </ToolkitWrapper>
  );
};

const ToolkitWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: ${(props) => (props.noMargin ? '0' : '1rem')};
  svg {
    fill: ${(props) => (props.active ? '#0095f8' : 'rgb(186, 195, 201)')};
  }
  &:hover {
    svg {
      fill: #0095f8;
    }
  }
`;

const ToolkitTitle = styled(Typography.Text)`
  font-size: 13px;
  line-height: 14px;
  color: ${(props) => (props.color ? props.color : '#454545')};
`;

export default Toolkit;
